import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative overflow-hidden border-t border-zinc-800 bg-[#09090B] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="footer-glow footer-glow-one" />
        <div className="footer-glow footer-glow-two" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        {/* ================= CTA ================= */}
        <section className="relative py-24 text-center sm:py-28 lg:py-32">
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-xs font-semibold text-violet-500 sm:text-sm">
              Ready when you are
            </p>

            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Build a video platform
              <br />
              <span className="footer-gradient-text">
                that scales with you.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Upload, moderate, host, and stream your videos with everything you
              need in one platform.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="footer-cta group relative overflow-hidden rounded-full px-7 py-3.5 font-display text-sm font-bold text-zinc-950"
              >
                <span className="relative z-10">Get started for free</span>

                <span className="absolute inset-0 -z-0 bg-linear-to-r from-violet-500 via-blue-400 to-cyan-400 transition-transform duration-500 group-hover:scale-110" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= Divider ================= */}
        <div className="h-px w-full bg-zinc-800" />

        {/* ================= Main Footer ================= */}
        <section className="grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:py-16">
          {/* Brand */}
          <div>
            <Link to="/" className="group inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-cyan-400 font-display text-sm font-bold text-zinc-950 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                V
              </div>

              <span className="font-display text-lg font-bold tracking-tight">
                VidMod
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-zinc-500">
              The AI-powered infrastructure for hosting, moderating, and
              streaming video at scale.
            </p>

            {/* Status */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/70 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>

              <span className="text-[11px] font-medium text-zinc-400">
                All systems operational
              </span>
            </div>
          </div>

          {/* Product */}
          <FooterColumn
            title="Product"
            links={[
              ["Platform", "/platform"],
              ["Moderation", "/moderation"],
              ["Analytics", "/analytics"],
              ["Pricing", "/pricing"],
            ]}
          />

          {/* Developers */}
          <FooterColumn
            title="Developers"
            links={[
              ["Documentation", "/docs"],
              ["API Reference", "/docs/api"],
              ["SDKs", "/docs/sdks"],
              ["Changelog", "/changelog"],
            ]}
          />

          {/* Company */}
          <FooterColumn
            title="Company"
            links={[
              ["About", "/about"],
              ["Community", "/community"],
              ["Contact", "/contact"],
              ["Privacy", "/privacy"],
            ]}
          />
        </section>

        {/* ================= Bottom ================= */}
        <div className="flex flex-col gap-6 border-t border-zinc-800 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} VidMod. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a href="#" aria-label="GitHub" className="footer-social">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
              </svg>
            </a>

            {/* X */}
            <a
              href="#"
              aria-label="X"
              className="footer-social font-display text-xs font-bold"
            >
              𝕏
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="footer-social font-display text-xs font-bold"
            >
              in
            </a>

            {/* Back to top */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:bg-violet-500/10 hover:text-violet-400"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================= Footer Column ================= */

type FooterColumnProps = {
  title: string;
  links: [string, string][];
};

const FooterColumn = ({ title, links }: FooterColumnProps) => {
  return (
    <div>
      <h3 className="font-display text-xs font-bold uppercase tracking-wider text-zinc-300">
        {title}
      </h3>

      <ul className="mt-5 space-y-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link
              to={href}
              className="footer-link group inline-flex items-center text-sm text-zinc-500"
            >
              <span>{label}</span>

              <span className="ml-1.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
