"use client";

import Image from "next/image";

const teamMembers = [
  { id: "john-doe", name: "John Doe", role: "Director", image: "/images/team.jpg" },
  { id: "jane-doe", name: "Jane Doe", role: "CEO", image: "/images/team.jpg" },
  { id: "john-smith", name: "John Smith", role: "Director", image: "/images/team.jpg" },
  { id: "robert-fox", name: "Robert Fox", role: "Director", image: "/images/team.jpg" },
  { id: "jane-smith-1", name: "Jane Smith", role: "CEO", image: "/images/team.jpg" },
  { id: "jane-smith-2", name: "Jane Smith", role: "CEO", image: "/images/team.jpg" },
  { id: "jane-smith-3", name: "Jane Smith", role: "CEO", image: "/images/team.jpg" },
];

export default function MeetOurTeam() {
  return (
    <section className=" relative z-0 overflow-hidden py-16 md:py-24">
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 -z-20 opacity-5">
        <Image 
          src="/images/chevron.png" 
          alt="Pattern" 
          fill 
          className="object-cover" 
        />
      </div>

      {/* Added md:px-20 to set the side margins for the whole section */}
<div className="relative z-10 mx-auto max-w-7xl px-6 md:px-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0D1B2A] md:text-5xl">Meet Our Team</h2>
        <p className="mt-4 text-base sm:text-lg font-medium text-gray-500">
          We Provide Services for All Your Needs
        </p>

        <div className="mt-14 sm:mt-20 flex flex-col items-center gap-10 md:gap-16">
          {/* TOP ROW: 4 MEMBERS (Indices 0, 1, 2, 3) */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-16">
            {teamMembers.slice(0, 4).map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>

          {/* BOTTOM ROW: 3 MEMBERS (Indices 4, 5, 6) */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-16">
            {teamMembers.slice(4, 7).map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamMember({ member }: Readonly<{ member: typeof teamMembers[0] }>) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48 overflow-hidden rounded-full shadow-lg">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      
      <h3 className="text-lg font-bold text-[#0D1B2A]">{member.name}</h3>
      <p className="text-xs font-bold uppercase tracking-wider text-[#4A2B10]">
        {member.role}
      </p>
    </div>
  );
}