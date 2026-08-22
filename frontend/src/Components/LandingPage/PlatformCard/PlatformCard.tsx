import React from "react";

type PlatformCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconGradient: string;
};

const PlatformCard = ({
  title,
  description,
  icon,
  iconGradient,
}: PlatformCardProps) => {
  return (
    <div className="group relative">
      {/* Purple ambient glow */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-1
          rounded-2xl
          bg-violet-600/20
          opacity-0
          blur-2xl
          transition-all
          duration-500
          ease-out
          group-hover:opacity-100
        "
      />

      {/* Card */}
      <div
        className="
          relative
          rounded-2xl
          border
          border-zinc-800
          bg-[#171719]
          p-6
          transition-all
          duration-300
          ease-out

          group-hover:-translate-y-1
          group-hover:border-violet-500/30
          group-hover:bg-[#19171d]
        "
      >
        {/* Icon */}
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br ${iconGradient}`}
        >
          {icon}
        </div>

        {/* Content */}
        <div className="mt-5">
          <h3 className="font-display text-base font-bold text-white">
            {title}
          </h3>

          <p className="mt-1.5 max-w-sm text-xs leading-5 text-zinc-400 sm:text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformCard;
