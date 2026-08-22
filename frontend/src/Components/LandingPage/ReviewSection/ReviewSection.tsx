import React from "react";

type Review = {
  name: string;
  company: string;
  review: string;
  likes: number;
  avatar: string;
};

const reviews: Review[] = [
  {
    name: "Daniel Kim",
    company: "Aperture",
    review:
      "Migrated our whole video pipeline in an afternoon. The webhooks map perfectly onto our state machine.",
    likes: 186,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Ana Lopez",
    company: "Fieldnote",
    review:
      "The analytics finally tell us something useful — retention per video, not just a total view count.",
    likes: 152,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Priya Shah",
    company: "Verdant",
    review:
      "Rate limits scale with our plan and the docs are the clearest I've used for a moderation API.",
    likes: 97,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Marcus Webb",
    company: "Kindred",
    review:
      "Our trust & safety team finally has a dashboard they actually check every morning.",
    likes: 133,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Jordan Marsh",
    company: "Northline Media",
    review:
      "Caught unsafe content before it ever reached our audience. Genuinely faster than our old review queue.",
    likes: 214,
    avatar: "https://i.pravatar.cc/150?img=68",
  },
];

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <article className="w-[270px] shrink-0 rounded-2xl border border-zinc-800 bg-[#171719] p-5 sm:w-[290px]">
      {/* Profile */}
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0">
          <h3 className="font-display text-xs font-bold text-white">
            {review.name}
          </h3>

          <p className="text-[10px] text-zinc-500">{review.company}</p>
        </div>
      </div>

      {/* Review */}
      <p className="mt-4 min-h-[72px] text-xs leading-5 text-zinc-400">
        "{review.review}"
      </p>

      {/* Likes */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-zinc-500">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
        >
          <path d="M20.8 8.7c0 5.2-8.8 10.3-8.8 10.3S3.2 13.9 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z" />
        </svg>

        <span>{review.likes}</span>
      </div>
    </article>
  );
};

const ReviewSection = () => {
  return (
    <section className="w-full overflow-hidden bg-[#101012] py-24 text-white sm:py-28">
      {/* Heading */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="font-display text-xs font-semibold text-violet-500 sm:text-sm">
          Community
        </p>

        <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Built on a community that
          <br className="hidden sm:block" />
          isn't going anywhere
        </h2>
      </div>

      {/* Reviews */}
      <div className="relative mt-14 overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-[#101012] to-transparent sm:w-32" />

        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-[#101012] to-transparent sm:w-32" />

        <div className="review-marquee flex w-max gap-4">
          {/* First set */}
          {reviews.map((review, index) => (
            <ReviewCard key={`first-${index}`} review={review} />
          ))}

          {/* Duplicate set for infinite scroll */}
          {reviews.map((review, index) => (
            <ReviewCard key={`second-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
