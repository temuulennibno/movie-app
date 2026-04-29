/* eslint-disable @next/next/no-img-element */
"use client";

import "swiper/css";
import { Slides } from "./components/slides";
import { useEffect, useState } from "react";
import { tmdb } from "@/lib/tmdb";
import { Movie } from "@/types";
import { MovieSection } from "./components/movie-section";

export default function Home() {
  const [upcomings, setUpcomings] = useState<Movie[]>([]);
  const [uLoading, setULoading] = useState(true);

  const [trendings, setTrendings] = useState<Movie[]>([]);
  const [tLoading, setTLoading] = useState(true);

  useEffect(() => {
    tmdb.get("/movie/upcoming").then((res) => {
      setUpcomings(res.data.results);
      setULoading(false);
    });
    tmdb.get("/movie/popular").then((res) => {
      setTrendings(res.data.results);
      setTLoading(false);
    });
  }, []);

  return (
    <>
      <Slides />
      <MovieSection loading={uLoading} movies={upcomings} title="Upcomings" link={"/movies/upcoming"} />
      <MovieSection loading={tLoading} movies={trendings} title="Trendings" link={"/movies/trending"} />
    </>
  );
}
