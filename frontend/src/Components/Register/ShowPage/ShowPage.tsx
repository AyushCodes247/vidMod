import React from "react";

const features = [
  {
    title: "AI moderation on every frame",
    description:
      "NSFW, violence, and unsafe-content detection runs automatically on upload.",
  },
  {
    title: "Adaptive streaming, zero setup",
    description:
      "Every upload is transcoded to every resolution automatically.",
  },
  {
    title: "Private by default",
    description:
      "Signed URLs, domain restrictions, and download controls on every plan.",
  },
];

const ShowPage = () => {
  return (
    <div className="hidden min-h-screen w-full flex-col bg-[#09090B] border-white/10 border-r-2 text-white md:flex md:w-[60%]">
      {/* Logo */}
      <div className="px-12 pt-10">
        <div className="flex items-center gap-3 cursor-pointer">
          {/* Logo icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-cyan-400">
            <span className="text-sm font-bold text-black">V</span>
          </div>

          {/* Logo text */}
          <span className="text-xl font-semibold tracking-tight">VidMod</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col px-12">
        {/* Hero */}
        <div className="flex flex-1 items-center">
          <div className="max-w-120">
            <h1 className="text-4xl font-bold leading-tight tracking-tight cursor-pointer">
              Host video like it’s{" "}
              <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                the main product,
              </span>{" "}
              not an afterthought.
            </h1>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-col gap-5 pb-12">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              {/* Check icon */}
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900">
                <span className="text-xs text-cyan-400">✓</span>
              </div>

              {/* Feature content */}
              <div>
                <h2 className="text-sm font-semibold leading-5 text-white">
                  {feature.title}
                </h2>

                <p className="max-w-100 text-xs leading-5 text-zinc-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
