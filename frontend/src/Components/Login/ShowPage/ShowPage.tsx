import React from "react";

const ShowPage = () => {
  return (
    <div className="hidden min-h-screen w-full flex-col bg-[#08080a] text-white md:flex md:w-[60%] border-white/10 border-r-2">
      {/* Logo */}
      <div className="px-12 pt-12">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg cursor-pointer bg-linear-to-br from-violet-500 to-cyan-400">
            <span className="font-display text-sm font-bold text-black">V</span>
          </div>

          {/* Brand */}
          <span className="font-display text-sm font-bold tracking-tight cursor-pointer">
            VidMod
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col px-12">
        {/* Testimonial section */}
        <div className="flex flex-1 items-center">
          <div className="max-w-115">
            {/* Status badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-[#101012] px-3 py-1 cursor-pointer">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

              <span className="text-[11px] font-medium text-white/60">
                AI moderation active on every upload
              </span>
            </div>

            {/* Quote */}
            <blockquote className="font-display text-2xl font-bold leading-[1.45] tracking-tight text-zinc-100 cursor-pointer">
              <span>&rdquo;</span>
              We caught unsafe content before it ever reached our audience.{" "}
              <span className="bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                VidMod&apos;s pipeline
              </span>{" "}
              runs faster than our old manual review ever did.
              <span>&rdquo;</span>
            </blockquote>

            {/* Author */}
            <div className="mt-6 flex items-center gap-3">
              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-violet-500 cursor-pointer to-cyan-400">
                <span className="text-xs font-bold text-black">JM</span>
              </div>

              {/* Author details */}
              <div className="leading-tight cursor-pointer">
                <p className="text-sm font-semibold text-zinc-100">
                  Jordan Marsh
                </p>

                <p className="mt-0.5 text-[11px] text-zinc-500">
                  Head of Trust &amp; Safety, Northline Media
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-end gap-12 pb-12">
          {/* Accuracy */}
          <div className="cursor-pointer">
            <p className="font-display text-xl font-bold tracking-tight text-zinc-100">
              99.82%
            </p>

            <p className="mt-1 text-[10px] text-zinc-500">Detection accuracy</p>
          </div>

          {/* Latency */}
          <div className="cursor-pointer">
            <p className="font-display text-xl font-bold tracking-tight text-zinc-100">
              140ms
            </p>

            <p className="mt-1 text-[10px] text-zinc-500">Avg. latency</p>
          </div>

          {/* Countries */}
          <div className="cursor-pointer">
            <p className="font-display text-xl font-bold tracking-tight text-zinc-100">
              180+
            </p>

            <p className="mt-1 text-[10px] text-zinc-500">Countries served</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
