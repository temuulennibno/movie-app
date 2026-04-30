"use client";
import { tmdb } from "@/lib/tmdb";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { MovieCard } from "../../components/movie-card";
import { notFound, useParams } from "next/navigation";
import { Pagination } from "@/app/components/pagination";

export default function Page() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { type }: { type: "upcoming" | "trending" } = useParams();

  const pageInfo = {
    upcoming: {
      url: "/movie/upcoming",
      title: "Upcoming",
    },
    trending: {
      url: "/movie/popular",
      title: "Trending",
    },
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const page = pageInfo[type] || null;

  useEffect(() => {
    tmdb
      .get(page.url, {
        params: {
          page: currentPage,
        },
      })
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
        setTotalPages(res.data.total_pages);
      });
  }, [currentPage]);

  if (!page) return notFound();

  return (
    <main>
      <div className="container">
        <h2>{page.title} </h2>
        <div className="grid grid-cols-5 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <Pagination onPageChange={handlePageChange} totalPages={totalPages} currentPage={currentPage} />
      </div>
    </main>
  );
}
