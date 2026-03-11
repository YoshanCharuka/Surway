"use client";

import Image from "next/image";

const teamMembers = [
  { name: "John Doe", role: "Director", image: "/images/team.jpg" },
  { name: "Jane Doe", role: "CEO", image: "/images/team.jpg" },
  { name: "John Smith", role: "Director", image: "/images/team.jpg" },
  { name: "Robert Fox", role: "Director", image: "/images/team.jpg" },
  { name: "Jane Smith", role: "CEO", image: "/images/team.jpg" },
  { name: "Jane Smith", role: "CEO", image: "/images/team.jpg" },
  { name: "Jane Smith", role: "CEO", image: "/images/team.jpg" },
];

export default function MeetOurTeam() {
  return (
    <section className=" relative z-0 overflow-hidden py-24">
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
        <h2 className="text-4xl font-bold text-[#0D1B2A] md:text-5xl">Meet Our Team</h2>
        <p className="mt-4 text-lg font-medium text-gray-500">
          We Provide Services for All Your Needs
        </p>

        <div className="mt-20 flex flex-col items-center gap-22 md:gap-24">
          {/* TOP ROW: 4 MEMBERS (Indices 0, 1, 2, 3) */}
          <div className="flex flex-wrap justify-center gap-22 md:gap-24">
            {teamMembers.slice(0, 4).map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>

          {/* BOTTOM ROW: 3 MEMBERS (Indices 4, 5, 6) */}
          <div className="flex flex-wrap justify-center gap-22 md:gap-24">
            {teamMembers.slice(4, 7).map((member, index) => (
              <TeamMember key={index} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamMember({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 h-52 w-52 overflow-hidden rounded-full shadow-lg md:h-48 md:w-48">
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