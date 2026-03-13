const leaders = [
  {
    name: "T.A Uddeepana",
    position: "Founder & Managing Director",
    image: "/ach.webp",
    imagePosition: "center 15%",
    description:
      "T.A Uddeepana is the founder of LKTaxi and leads the company with a strong vision of providing reliable and professional taxi services across Sri Lanka. His focus is on customer satisfaction, service quality, and creating a trusted transportation experience for travelers visiting Sri Lanka.",
    initials: "TU",
  },
  {
    name: "Dhanajaya Wijerathna",
    position: "Co-Founder & Operations Manager",
    image: "/dhn.webp",
    imagePosition: "center center",
    description:
      "Dhanajaya Wijerathna manages daily operations at LKTaxi, ensuring every ride is organized smoothly and efficiently. His experience in tourism and transport coordination helps provide customers with comfortable vehicles and friendly professional drivers.",
    initials: "DW",
  },
];

const LeadershipSection = () => {
  return (
    <section
      id="leadership"
      className="py-20 bg-[#0e1217]"
    >
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#febe03] mb-3">
            Meet the Team
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our Leadership
          </h2>
          <p className="mt-4 text-secondary-foreground/50 max-w-xl mx-auto text-sm">
            The people behind LKTaxi — committed to delivering safe, reliable,
            and memorable travel experiences across Sri Lanka.
          </p>
          <div className="mt-5 mx-auto w-16 h-1 rounded-full bg-[#febe03]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="group relative bg-[#13171c] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center
                         shadow-lg hover:shadow-[0_8px_40px_rgba(254,190,3,0.12)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Accent ring */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-[#febe03]/20 scale-110 group-hover:scale-125 transition-transform duration-300" />
                {/* Profile image placeholder */}
                <div
                  className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#febe03]/60 flex items-center justify-center
                               bg-gradient-to-br from-[#1e2530] to-[#13171c] text-[#febe03] text-3xl font-bold select-none"
                >
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: leader.imagePosition }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLSpanElement | null;
                      if (fallback) fallback.style.display = "inline";
                    }}
                  />
                  <span style={{ display: "none" }}>{leader.initials}</span>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-white mb-1">
                {leader.name}
              </h3>

              {/* Position */}
              <span className="inline-block text-sm font-semibold text-[#febe03] mb-4 tracking-wide">
                {leader.position}
              </span>

              {/* Divider */}
              <div className="w-10 h-px bg-[#febe03]/40 mb-4" />

              {/* Description */}
              <p className="text-secondary-foreground/55 text-sm leading-relaxed">
                {leader.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
