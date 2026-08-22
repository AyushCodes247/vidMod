import React from "react";

const ShowPage = () => {
  return (
    <div className="hidden md:flex md:w-[60%] min-h-screen bg-[#09090B] text-white relative overflow-hidden border-white/10 border-r-2">
      {/* Logo */}
      <div className="absolute top-12 left-12 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
          <span className="text-black font-display font-bold text-lg">V</span>
        </div>

        <span className="font-display font-bold text-white">VidMod</span>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center justify-center px-8">
        {/* Animated Security Icon */}
        <div className="relative w-44 h-44 flex items-center justify-center mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border border-violet-500/20 animate-[spin_12s_linear_infinite]" />

          {/* Second rotating ring */}
          <div className="absolute inset-5 rounded-full border border-cyan-400/20 animate-[spin_8s_linear_infinite_reverse]" />

          {/* Glow */}
          <div className="absolute w-28 h-28 rounded-full bg-gradient-to-r from-violet-500/20 to-cyan-400/20 blur-2xl animate-pulse" />

          {/* Icon container */}
          <div className="relative w-[84px] h-[84px] rounded-[24px] bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-[0_0_45px_rgba(139,92,246,0.25)] animate-pulse">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-black"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="max-w-xl text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            The same AI that{" "}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              moderates every frame
            </span>{" "}
            protects your account.
          </h1>

          <p className="mt-4 font-body text-sm md:text-base text-zinc-400 leading-7">
            One-time codes are single-use, expire in 10 minutes, and are
            rate-limited to stop brute-force attempts before they start.
          </p>
        </div>

        {/* Security Features */}
        <div className="absolute bottom-28 left-12 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md border border-zinc-700 flex items-center justify-center">
              <span className="text-cyan-400 text-xs">✓</span>
            </div>

            <p className="text-sm text-zinc-400">
              <span className="text-white font-semibold">
                Encrypted delivery
              </span>{" "}
              — codes are never stored in plain text
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md border border-zinc-700 flex items-center justify-center">
              <span className="text-cyan-400 text-xs">✓</span>
            </div>

            <p className="text-sm text-zinc-400">
              <span className="text-white font-semibold">
                Device fingerprinting
              </span>{" "}
              flags sign-ins from new locations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md border border-zinc-700 flex items-center justify-center">
              <span className="text-cyan-400 text-xs">✓</span>
            </div>

            <p className="text-sm text-zinc-400">
              <span className="text-white font-semibold">SOC 2 Type II</span>{" "}
              certified infrastructure
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-12 left-12 flex gap-12">
          <div>
            <p className="font-display text-xl font-bold text-white">48M+</p>
            <p className="text-xs text-zinc-500">Accounts verified</p>
          </div>

          <div>
            <p className="font-display text-xl font-bold text-white">1.8s</p>
            <p className="text-xs text-zinc-500">Avg. code delivery</p>
          </div>

          <div>
            <p className="font-display text-xl font-bold text-white">99.99%</p>
            <p className="text-xs text-zinc-500">Delivery success</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPage;
