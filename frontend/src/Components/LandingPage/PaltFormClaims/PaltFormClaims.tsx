import React from "react";

const PaltFormClaims = () => {
  const claims = [
    {
      value: "99.98%",
      label: "Platform uptime",
    },
    {
      value: "140ms",
      label: "Avg. moderation latency",
    },
    {
      value: "99.82%",
      label: "Detection accuracy",
    },
    {
      value: "180+",
      label: "Countries served",
    },
  ];

  return (
    <section className="w-full bg-[#09090B] px-4 py-24 text-white sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-xs font-semibold text-violet-500 sm:text-sm">
          Not just vibes
        </p>

        <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          A full platform, at
          <br />
          production scale
        </h2>
      </div>

      {/* Claims */}
      <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[24px] border border-zinc-800 bg-[#151517] sm:mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {claims.map((claim, index) => (
            <div
              key={claim.label}
              className={`
                flex flex-col items-center justify-center
                px-6 py-8 text-center
                lg:py-10
                ${
                  index !== claims.length - 1
                    ? "border-b border-zinc-800 lg:border-b-0 lg:border-r"
                    : ""
                }
                ${index === 1 ? "sm:border-r-0 lg:border-r" : ""}
              `}
            >
              <p className="font-display text-3xl font-bold tracking-tight text-violet-100 sm:text-4xl">
                {claim.value}
              </p>

              <p className="mt-2 text-xs font-medium text-zinc-500 sm:text-sm">
                {claim.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaltFormClaims;
