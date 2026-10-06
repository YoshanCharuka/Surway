const OFFICE = {
  lat: 6.853284,
  lon: 79.9117423,
};

const USER_AGENT = "wegrow-survey/1.0 (quotation distance)";

type DistanceResult = {
  distance: string;
  kilometers: number;
  place: string;
};

const cache = new Map<string, DistanceResult>();

export async function GET(request: Request) {
  const location = new URL(request.url).searchParams.get("location")?.trim() ?? "";
  if (location.length < 2) {
    return Response.json(
      { success: false, distance: "", error: "Enter a location." },
      { status: 400 },
    );
  }

  const key = location.toLowerCase();
  const cached = cache.get(key);
  if (cached) {
    return Response.json({ success: true, ...cached });
  }

  try {
    const place = await geocode(location);
    if (!place) {
      return Response.json(
        { success: false, distance: "", error: "No matching place in Sri Lanka." },
        { status: 404 },
      );
    }

    const kilometers = await drivingKilometers(place.lat, place.lon);
    const result: DistanceResult = {
      distance: formatKm(kilometers),
      kilometers: Math.round(kilometers * 10) / 10,
      place: place.name,
    };
    cache.set(key, result);
    return Response.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not calculate distance.";
    console.error("Distance lookup failed:", error);
    return Response.json(
      { success: false, distance: "", error: message },
      { status: 502 },
    );
  }
}

async function geocode(location: string) {
  const search = /sri lanka/i.test(location) ? location : `${location}, Sri Lanka`;
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "lk");
  url.searchParams.set("q", search);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    },
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not look up that location.");
  }

  const rows = (await response.json()) as Array<{ lat?: string; lon?: string; display_name?: string }>;
  const match = rows[0];
  const lat = Number.parseFloat(match?.lat ?? "");
  const lon = Number.parseFloat(match?.lon ?? "");
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return null;
  }

  return {
    lat,
    lon,
    name: match?.display_name ?? location,
  };
}

async function drivingKilometers(lat: number, lon: number) {
  const url = `https://router.project-osrm.org/route/v1/driving/${OFFICE.lon},${OFFICE.lat};${lon},${lat}?overview=false`;
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    if (response.ok) {
      const data = (await response.json()) as { routes?: Array<{ distance?: number }> };
      const meters = data.routes?.[0]?.distance;
      if (typeof meters === "number" && Number.isFinite(meters)) {
        return meters / 1000;
      }
    }
  } catch (error) {
    console.error("Driving route lookup failed, using straight-line distance:", error);
  }

  return haversineKm(OFFICE.lat, OFFICE.lon, lat, lon);
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (degrees: number) => (degrees * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatKm(kilometers: number) {
  const rounded = Math.round(kilometers * 10) / 10;
  const text = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  return `${text} km`;
}
