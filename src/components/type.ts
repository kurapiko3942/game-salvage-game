// src/components/type.ts
export interface Company {
  id: number;
  name: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  id: number;
  name: string;
}

export interface Screenshot {
  id: number;
  url: string;
}

export interface Website {
  id: number;
  url: string;
}

export interface Video {
  video_id: string;
}

export interface Game {
  id: string;
  name: string;
  first_release_date: number;
  involved_companies?: { company?: { name: string } }[];
  genres?: { name: string }[];
  platforms?: { name: string }[];
  screenshots?: { url: string }[];
  storyline?: string;
  summary?: string;
  total_rating?: number;
  total_rating_count?: number;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  websites?: { id: string; url: string }[];
  videos?: { video_id: string }[];
}
