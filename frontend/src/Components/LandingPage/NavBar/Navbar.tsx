import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="w-full bg-[#09090B]">
      <nav className="flex h-18 w-full items-center justify-between border-b border-zinc-800 px-11">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-violet-500 to-cyan-400">
            <span className="font-display text-sm font-bold text-black">V</span>
          </div>

          <span className="font-display text-xl font-bold tracking-tight text-white">
            VidMod
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link
            to="/login"
            className="text-sm font-semibold text-zinc-400 transition hover:text-white"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="flex h-10 items-center rounded-full bg-linear-to-r from-violet-500 to-cyan-400 px-6 text-sm font-bold text-black transition hover:brightness-110"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
