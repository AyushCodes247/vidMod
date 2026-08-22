import React from "react";

const PlatformOverview = () => {
  return (
    <section className="min-h-[130vh] w-full overflow-hidden bg-[#09090B] px-4 py-24 text-white sm:px-6 md:px-8 lg:px-10 lg:py-28">
      {/* Section Header */}
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-display text-xs font-semibold text-violet-500 sm:text-sm">
          Agents that work alongside you
        </p>

        <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Not just tools. A platform
          <br className="hidden sm:block" />
          that thinks with you.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Every upload moves through moderation, transcoding, and delivery
          automatically — no manual review queue required.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mx-auto mt-14 max-w-6xl space-y-5 sm:mt-16 md:space-y-6">
        {/* =========================================================
            AI MODERATION
        ========================================================= */}
        <div className="grid overflow-hidden rounded-[28px] border border-zinc-800 bg-[#151517] lg:grid-cols-2">
          {/* Text */}
          <div className="flex min-h-[390px] flex-col justify-center p-8 sm:p-10 lg:p-11">
            <span className="w-fit rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-violet-600">
              AI Moderation
            </span>

            <h3 className="mt-5 max-w-lg font-display text-2xl font-bold leading-tight sm:text-3xl">
              Every frame reviewed before your audience sees it
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
              NSFW, violence, and unsafe-content models score every frame in
              real time, with confidence-scored decisions instead of a black
              box.
            </p>

            <a
              href="#moderation"
              className="mt-5 w-fit text-sm font-semibold text-violet-500 transition hover:text-violet-400"
            >
              See how moderation works →
            </a>
          </div>

          {/* Moderation Visualization */}
          <div className="flex items-center justify-center bg-[#101012] p-7 sm:p-10">
            <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#18181a]">
              {/* Video area */}
              <div className="relative h-56 overflow-hidden bg-linear-to-br from-violet-950 via-[#26394b] to-[#173b48] sm:h-64">
                {/* Ambient glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.08),transparent_55%)]" />

                {/* Scanning line */}
                <div className="moderation-scan absolute left-0 right-0 h-px bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.65)]" />

                {/* Detection box */}
                <div className="detection-box absolute left-1/2 top-1/2 h-24 w-36 -translate-x-1/2 -translate-y-1/2 rounded border border-cyan-400 sm:h-24 sm:w-36" />

                {/* Detection corners */}
                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-[72px] -translate-y-[48px] border-l border-t border-cyan-300" />

                <span className="absolute left-1/2 top-1/2 h-2 w-2 translate-x-[64px] -translate-y-[48px] border-r border-t border-cyan-300" />

                <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-[72px] translate-y-[40px] border-b border-l border-cyan-300" />

                <span className="absolute left-1/2 top-1/2 h-2 w-2 translate-x-[64px] translate-y-[40px] border-b border-r border-cyan-300" />
              </div>

              {/* Scores */}
              <div className="divide-y divide-zinc-800 px-4">
                <div className="flex items-center justify-between py-2.5 text-[10px]">
                  <span className="text-zinc-400">NSFW score</span>
                  <span className="font-semibold text-emerald-400">0.021</span>
                </div>

                <div className="flex items-center justify-between py-2.5 text-[10px]">
                  <span className="text-zinc-400">Violence score</span>
                  <span className="font-semibold text-emerald-400">0.004</span>
                </div>

                <div className="flex items-center justify-between py-2.5 text-[10px]">
                  <span className="text-zinc-400">Status</span>
                  <span className="font-semibold text-zinc-300">Approved</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            ANALYTICS
        ========================================================= */}
        <div className="grid overflow-hidden rounded-[28px] border border-zinc-800 bg-[#151517] lg:grid-cols-2">
          {/* Analytics Visualization */}
          <div className="order-2 flex items-center justify-center bg-[#101012] p-7 sm:p-10 lg:order-1">
            <div className="w-full max-w-xl rounded-2xl border border-zinc-800 bg-[#18181a] p-5 sm:p-6">
              {/* Stats */}
              <div className="flex gap-6 sm:gap-8">
                <div>
                  <p className="font-display text-2xl font-bold">2.4M</p>
                  <p className="text-[9px] text-zinc-500">Views</p>
                </div>

                <div>
                  <p className="font-display text-2xl font-bold">61%</p>
                  <p className="text-[9px] text-zinc-500">Retention</p>
                </div>

                <div>
                  <p className="font-display text-2xl font-bold">6:42</p>
                  <p className="text-[9px] text-zinc-500">Avg. watch</p>
                </div>
              </div>

              {/* Chart */}
              <div className="relative mt-8 h-28 overflow-hidden">
                <svg
                  viewBox="0 0 500 130"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <defs>
                    <linearGradient
                      id="analyticsGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#06b6d4"
                        stopOpacity="0.35"
                      />

                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Area underneath graph */}
                  <path
                    className="analytics-area"
                    d="
        M0 105
        L45 98
        L90 102
        L135 78
        L180 86
        L225 55
        L270 65
        L315 40
        L360 48
        L405 22
        L450 31
        L500 10
        L500 130
        L0 130
        Z
      "
                    fill="url(#analyticsGradient)"
                  />

                  {/* Graph line */}
                  <path
                    className="analytics-line"
                    d="
        M0 105
        L45 98
        L90 102
        L135 78
        L180 86
        L225 55
        L270 65
        L315 40
        L360 48
        L405 22
        L450 31
        L500 10
      "
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 flex min-h-[390px] flex-col justify-center p-8 sm:p-10 lg:order-2 lg:p-11">
            <span className="w-fit rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-semibold text-cyan-600">
              Analytics
            </span>

            <h3 className="mt-5 max-w-lg font-display text-2xl font-bold leading-tight sm:text-3xl">
              Analytics that map to real outcomes
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-400">
              Retention curves, drop-off points, and traffic sources — not just
              a total view count. Know what's actually working.
            </p>

            <a
              href="#analytics"
              className="mt-5 w-fit text-sm font-semibold text-cyan-500 transition hover:text-cyan-400"
            >
              Explore analytics →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;
