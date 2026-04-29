import { tmdb } from "@/lib/tmdb";
import { Genre } from "@/types";
import { useEffect, useState } from "react";

export const GenreSelector = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    tmdb.get("/genre/movie/list").then((res) => {
      setGenres(res.data.genres);
    });
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="flex gap-2 items-center font-medium text-[#181818] px-4 py-2.5 border border-[#E4E4E7] rounded-[10px] shadow-xs cursor-pointer hover:opacity-80 dark:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Genre
      </button>
      <div
        data-shown={isVisible}
        className={`absolute duration-300  p-5 bg-white border border-[#E4E4E7] rounded-lg mt-1 data-[shown=true]:visible data-[shown=true]:opacity-100 invisible opacity-0`}
      >
        <div className="mt-1 font-semibold text-2xl text-[#09090B]">Genres</div>
        <div className="text-[#09090B]">See lists of movies by genre</div>
        <hr className="border border-[#E4E4E7] my-4" />
        <div className="flex flex-wrap gap-4 max-w-[540px]">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="border cursor-pointer hover:opacity-80 duration-300 text-xs font-semibold py-0.5 pl-2.5 pr-1 border-[#E4E4E7] rounded-full flex items-center gap-2"
            >
              {genre.name}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="#09090B" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
