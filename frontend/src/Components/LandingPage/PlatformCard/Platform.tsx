import React from "react";
import PlatformCard from "./PlatformCard";

const Platform = () => {
  const platforms = [
    {
      title: "Video hosting",
      description:
        "Large uploads to 5GB, multi-part, cloud storage, global CDN delivery.",
      iconGradient: "from-violet-500 to-cyan-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-zinc-950"
        >
          <rect x="4" y="5" width="16" height="12" rx="1.5" />
          <path d="M8 20h8" />
          <path d="M12 17v3" />
        </svg>
      ),
    },

    {
      title: "Real-time processing",
      description:
        "Live upload, transcode, and moderation status via WebSocket.",
      iconGradient: "from-fuchsia-400 to-violet-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-zinc-950"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <path d="m5.6 5.6 2.1 2.1" />
          <path d="m16.3 16.3 2.1 2.1" />
          <path d="m18.4 5.6-2.1 2.1" />
          <path d="m7.7 16.3-2.1 2.1" />
        </svg>
      ),
    },

    {
      title: "Creator dashboard",
      description:
        "Views, watch time, and engagement reports in one live view.",
      iconGradient: "from-cyan-400 to-lime-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-zinc-950"
        >
          <path d="M5 19V9" />
          <path d="M12 19V5" />
          <path d="M19 19v-7" />
        </svg>
      ),
    },

    {
      title: "Authentication",
      description:
        "JWT, Google OAuth, sessions, and role-based access control.",
      iconGradient: "from-fuchsia-400 to-violet-500",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-zinc-950"
        >
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      ),
    },

    {
      title: "Notifications",
      description: "Real-time alerts for uploads, processing, and moderation.",
      iconGradient: "from-violet-500 to-cyan-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-zinc-950"
        >
          <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      ),
    },

    {
      title: "Moderation reports",
      description: "Flagged frames, risk scores, and full processing logs.",
      iconGradient: "from-cyan-400 to-lime-400",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-5 w-5 text-zinc-950"
        >
          <path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full bg-[#101012] px-4 py-24 text-white sm:px-6 md:px-8 lg:px-10 lg:py-28">
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-xs font-semibold text-violet-500 sm:text-sm">
          Platform
        </p>

        <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Everything a modern video
          <br className="hidden sm:block" />
          product needs
        </h2>
      </div>

      {/* Cards */}
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <PlatformCard
            key={platform.title}
            title={platform.title}
            description={platform.description}
            icon={platform.icon}
            iconGradient={platform.iconGradient}
          />
        ))}
      </div>
    </section>
  );
};

export default Platform;
