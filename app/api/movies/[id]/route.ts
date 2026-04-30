import { tmdb } from "@/lib/tmdb";
import { NextResponse, type NextRequest } from "next/server";

type Video = {
  key: string;
  site: string;
  type: string;
  official: boolean;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!/^\d+$/.test(id)) {
    return NextResponse.json(
      { error: "Invalid movie id" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const { data } = await tmdb.get(`/movie/${id}`, {
      params: { append_to_response: "credits,videos,images" },
    });

    const allTrailers: Video[] = data.videos?.results ?? [];
    const officialTrailers = allTrailers.filter(
      (v) => v.type === "Trailer" && v.official === true
    );
    const trailers =
      officialTrailers.length > 0
        ? officialTrailers
        : allTrailers.filter((v) => v.type === "Trailer");

    const credits = [
      ...(data.credits?.cast ?? []),
      ...(data.credits?.crew ?? []),
    ];

    const movie: Record<string, unknown> = { ...data };
    delete movie.credits;
    delete movie.videos;

    return NextResponse.json(
      { ...movie, trailers, credits },
      { headers: corsHeaders }
    );
  } catch (error) {
    const status =
      typeof error === "object" && error && "response" in error
        ? // @ts-expect-error - axios error shape
          (error.response?.status as number | undefined) ?? 500
        : 500;

    return NextResponse.json(
      { error: "Failed to fetch movie details" },
      { status, headers: corsHeaders }
    );
  }
}
