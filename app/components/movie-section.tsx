import Link from "next/link";
import { MovieCard } from "./movie-card";
import { Movie } from "@/types";
import { Skeleton } from "./skeleton";

type MovieSectionProps = {
  movies: Movie[];
  title: string;
  link: string;
  loading: boolean;
};

export const MovieSection = ({ movies, title, link, loading }: MovieSectionProps) => {
  return (
    <section className="mt-[50px]">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-semibold text-2xl text-[#09090B]">{title}</h2>
          <Link href={link} className="py-2 px-4 flex items-center gap-2 text-[#09090B] text-sm font-medium hover:bg-gray-400">
            See more{" "}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.33301 8.00016H12.6663M12.6663 8.00016L7.99967 3.3335M12.6663 8.00016L7.99967 12.6668"
                stroke="#18181B"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        {!loading ? (
          <div className="grid grid-cols-5 gap-8">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton height={440} key={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
