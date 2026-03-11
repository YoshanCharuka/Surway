export const projects = [
  {
    id: "commercial-partitioning",
    type: "LAND SURVEY",
    title: "Commercial Land Partitioning",
    client: "Urban Development Authority",
    date: "2 months ago",
    location: "Colombo 07",
    heroImage: "/images/hero-aerial.jpg", // Replace with your aerial view
    sections: [
      {
        text: "In the heart of Colombo lies a 5-acre commercial plot that recently underwent a transformation. This wasn’t just any land survey — it was a high-precision, technology-driven partitioning project designed to unlock the full potential of the property. Our team, working with the Urban Development Authority, combined advanced GPS systems, drone aerial mapping, and robotic total stations to achieve millimeter-level accuracy.",
        image: "/images/topo-pattern.png", // Left-aligned image
        imagePosition: "left"
      },
      {
        text: "Every boundary, every contour, and every potential access point was meticulously measured and mapped, creating a foundation ready for future commercial development. Using GIS and CAD software, we processed topographical data to ensure each subdivided lot maximizes usability while complying with local zoning regulations.",
        gridImages: [
          "/images/topo-pattern.png", 
          "/images/topo-pattern.png", 
          "/images/topo-pattern.png"
        ],
        imagePosition: "grid"
      },
      {
        text: "Coordinating with neighboring properties and managing urban traffic presented unique challenges. But with careful scheduling, drone imaging, and a dedicated team, we captured every critical detail while minimizing disruption. The end result? Eight strategically designed commercial lots, each optimized for functionality and ready for immediate development.",
        footerImage: "/images/topo-pattern.png", // Final full-width map
        imagePosition: "full"
      }
    ],
    closingStatement: "This project is a prime example of how technology, planning, and precision can turn raw urban land into a highly valuable, development-ready asset."
  }
];