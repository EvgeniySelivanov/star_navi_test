export interface Hero {
  birth_year: string;
  films: number[];
  gender: string;
  height: string;
  name: string;
  starships: number[];
  heroFilms?: Film[];
  heroStarships?: Starship[];
}

export interface Film {
  id: number;
  director: string;
  episode_id: number;
  release_date:string;
  producer:string;
  title: string;
}

export interface Starship {
  id: number;
  hyperdrive_rating:string;
  manufacturer:string;
  name: string;
  model: string;
  films: number[];
  url: string;
}



export interface EnrichedHero extends Hero {
  heroFilms: Film[];
  heroStarships: Starship[];
}

export interface HeroesListProps {
  updatedHeroes: EnrichedHero[];
  pageNumber: number;
  setPageNumber: (page: number) => void;
  maxPages: number;
}