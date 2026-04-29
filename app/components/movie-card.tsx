/* eslint-disable @next/next/no-img-element */
import { Movie } from "@/types";
import Link from "next/link";

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} className="block">
      <img className="aspect-230/340 w-full object-cover" src={`https://images.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
      <div className="p-2 bg-[#F4F4F5]">
        <div className="flex items-center">
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.99967 3.3335L10.0597 7.50683L14.6663 8.18016L11.333 11.4268L12.1197 16.0135L7.99967 13.8468L3.87967 16.0135L4.66634 11.4268L1.33301 8.18016L5.93967 7.50683L7.99967 3.3335Z"
              fill="#FDE047"
              stroke="#FDE047"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {movie.vote_average}/10
        </div>
        <div className="text-[#09090B] text-lg line-clamp-2 max-14 overflow-hidden">{movie.title}</div>
      </div>
    </Link>
  );
};
