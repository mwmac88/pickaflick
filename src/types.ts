export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
}

export interface MovieDetails {
  backdrop_path: string;
  genres: Array<object>;
  overview: string;
  releaseDate: string;
  runtime: number;
  title: string;
}
