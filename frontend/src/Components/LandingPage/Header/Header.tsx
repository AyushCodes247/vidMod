import React from "react";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="min-h-screen w-full overflow-hidden bg-[#09090B] text-white">
      <div className="flex min-h-screen flex-col items-center px-4 pt-10 sm:px-6 sm:pt-12 md:px-8 md:pt-14 lg:px-10 lg:pt-16">
        {/* Announcement */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-[#101012] px-3 py-1.5 sm:mb-7">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-cyan-400">
            <span className="font-display text-[10px] font-bold text-black">
              V
            </span>
          </div>

          <span className="text-[10px] font-semibold text-zinc-300 sm:text-xs">
            Now shipping VidMod 3.0
          </span>
        </div>

        {/* Hero heading */}
        <h1 className="max-w-4xl text-center font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]">
          The AI platform for
          <br />
          <span className="bg-linear-to-r from-violet-500 via-violet-400 to-cyan-400 bg-clip-text italic text-transparent">
            standout
          </span>{" "}
          video
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-center text-xs leading-5 text-zinc-400 sm:mt-6 sm:text-sm sm:leading-6 md:text-base">
          Upload, moderate, host, and stream video at scale — with real-time
          <br className="hidden sm:block" />
          NSFW, violence, and unsafe-content detection built into every frame.
        </p>

        {/* CTA */}
        <div className="mt-7 flex w-full flex-col items-center gap-3 sm:mt-8 sm:w-auto sm:flex-row">
          <Link
            to="/register"
            className="flex h-11 w-full items-center justify-center rounded-full bg-linear-to-r from-violet-500 to-cyan-400 px-7 text-sm font-bold text-black transition hover:brightness-110 sm:w-auto"
          >
            Get started for free
          </Link>
        </div>

        {/* Dashboard wrapper */}
        <div className="mt-10 w-full max-w-5xl sm:mt-12">
          {/* Horizontal scroll only on very small screens */}
          <div className="overflow-x-auto pb-4 scrollbar-none">
            <div className="min-w-190 overflow-hidden rounded-[22px] border border-zinc-800 bg-[#0d0d0f] shadow-[0_0_80px_rgba(139,92,246,0.08)] sm:min-w-0 sm:rounded-[26px]">
              {/* Browser top bar */}
              <div className="flex h-11 items-center border-b border-zinc-800 bg-[#151517] px-3 sm:h-12 sm:px-4">
                {/* Window controls */}
                <div className="flex shrink-0 gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                  <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                </div>

                {/* Tabs */}
                <div className="ml-4 flex shrink-0 items-center gap-4 sm:ml-6 sm:gap-5">
                  <span className="rounded-md bg-zinc-800 px-2.5 py-1 text-[10px] font-semibold text-white sm:px-3 sm:text-[11px]">
                    Library
                  </span>

                  <span className="text-[10px] text-zinc-500 sm:text-[11px]">
                    Moderation
                  </span>

                  <span className="text-[10px] text-zinc-500 sm:text-[11px]">
                    Analytics
                  </span>
                </div>

                {/* URL */}
                <div className="ml-auto hidden rounded-md border border-zinc-800 bg-[#111113] px-3 py-1 sm:block">
                  <span className="font-mono text-[9px] text-zinc-600">
                    vidmod.co/library
                  </span>
                </div>
              </div>

              {/* Dashboard */}
              <div className="grid min-h-90 grid-cols-[160px_minmax(0,1fr)_190px] sm:grid-cols-[180px_minmax(0,1fr)_220px]">
                {/* Sidebar */}
                <aside className="border-r border-zinc-800 p-3 sm:p-4">
                  <p className="mb-3 px-2 text-[8px] font-semibold tracking-wider text-zinc-500 sm:text-[9px]">
                    WORKSPACE
                  </p>

                  <div className="space-y-1">
                    {[
                      ["Overview", "from-violet-500 to-cyan-400", true],
                      ["Upload", "from-violet-400 to-fuchsia-400", false],
                      ["Library", "from-emerald-400 to-lime-400", false],
                      ["Analytics", "from-cyan-400 to-blue-500", false],
                      ["Moderation", "from-violet-400 to-fuchsia-400", false],
                    ].map(([label, gradient, active]) => (
                      <div
                        key={String(label)}
                        className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[10px] sm:py-2 sm:text-[11px] ${
                          active
                            ? "bg-zinc-800 font-semibold text-white"
                            : "text-zinc-400"
                        }`}
                      >
                        <span
                          className={`h-3 w-3 shrink-0 rounded bg-linear-to-br sm:h-3.5 sm:w-3.5 ${gradient}`}
                        />

                        {label}
                      </div>
                    ))}
                  </div>

                  <p className="mb-3 mt-5 px-2 text-[8px] font-semibold tracking-wider text-zinc-500 sm:mt-6 sm:text-[9px]">
                    ACCOUNT
                  </p>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] text-zinc-400 sm:py-2 sm:text-[11px]">
                      <span className="h-3 w-3 shrink-0 rounded bg-linear-to-br from-violet-500 to-cyan-400 sm:h-3.5 sm:w-3.5" />
                      Settings
                    </div>

                    <div className="flex items-center gap-2 px-2 py-1.5 text-[10px] text-zinc-400 sm:py-2 sm:text-[11px]">
                      <span className="h-3 w-3 shrink-0 rounded bg-linear-to-br from-emerald-400 to-lime-400 sm:h-3.5 sm:w-3.5" />
                      Billing
                    </div>
                  </div>
                </aside>

                {/* Library */}
                <main className="min-w-0 p-4 sm:p-5">
                  <h2 className="mb-4 text-center font-display text-xs font-bold sm:mb-5 sm:text-sm">
                    Recent uploads
                  </h2>

                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      {
                        title: "Q3 Product Walkthrough",
                        gradient: "from-violet-300 to-cyan-300",
                        status: "Approved",
                      },
                      {
                        title: "Onboarding Ep. 4",
                        gradient: "from-pink-200 to-violet-300",
                        status: "Approved",
                      },
                      {
                        title: "Studio Tour",
                        gradient: "from-cyan-200 to-lime-300",
                        status: "Processing",
                      },
                    ].map((video) => (
                      <div
                        key={video.title}
                        className="min-w-0 overflow-hidden rounded-lg border border-zinc-800 bg-[#111113] sm:rounded-xl"
                      >
                        <div
                          className={`h-20 bg-linear-to-br sm:h-24 ${video.gradient}`}
                        />

                        <div className="px-1.5 py-2 text-center sm:px-2">
                          <p className="truncate text-[9px] font-semibold text-white sm:text-[10px]">
                            {video.title}
                          </p>

                          <p className="text-[8px] text-zinc-500 sm:text-[9px]">
                            1080p · MP4
                          </p>

                          <span
                            className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[7px] font-bold sm:px-2 sm:text-[8px] ${
                              video.status === "Approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {video.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </main>

                {/* Moderation */}
                <aside className="border-l border-zinc-800 p-3 sm:p-4">
                  <p className="mb-3 text-[8px] font-semibold tracking-wider text-zinc-500 sm:mb-4 sm:text-[9px]">
                    MODERATION
                  </p>

                  {[
                    ["NSFW", "0.02"],
                    ["Violence", "0.01"],
                    ["Unsafe content", "0.03"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-zinc-800 py-1.5 text-[9px] sm:py-2 sm:text-[10px]"
                    >
                      <span className="text-zinc-400">{label}</span>

                      <span className="font-semibold text-emerald-400">
                        {value}
                      </span>
                    </div>
                  ))}

                  <div className="mt-4 h-1 rounded-full bg-zinc-800 sm:mt-5">
                    <div className="h-full w-[96%] bg-linear-to-r from-violet-500 to-cyan-400" />
                  </div>

                  <p className="mt-2 text-center text-[8px] text-zinc-500 sm:text-[9px]">
                    96% confidence — approved
                  </p>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
