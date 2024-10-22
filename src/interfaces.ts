export interface Hero {
  birth_year: string;
  eye_color: string;
  films: number[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: number;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: number[];
  starships: number[];
  url: string;
  vehicles: number[];
  heroFilms?: Film[];
  heroStarships?: Starship[];
}

export interface Film {
  id: number;
  characters: number[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  title: string;
  url: string;
}

export interface Starship {
  id: number;
  name: string;
  model: string;
  starship_class: string;
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
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  maxPages: number;
}