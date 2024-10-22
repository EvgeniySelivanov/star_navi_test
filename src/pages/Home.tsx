import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getHeroes } from '../store/slices/heroesSlice';
import { getFilms } from '../store/slices/filmsSlice';
import { getShips } from '../store/slices/shipsSlice';
import {
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import CONSTANTS from '../constants';

const btnStyle = {
  maxWidth: '200px',
  width: '100%',
};

interface Hero {
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

interface Film {
  id: number;
  characters: number[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  title: string;
  url: string;
}

interface Starship {
  id: number;
  name: string;
  model: string;
  starship_class: string;
  films: number[];
  url: string;
}

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { count, results: heroes } = useAppSelector(
    (state) => state.heroes.data
  );
  const { results: films } = useAppSelector((state) => state.films.data);
  const {  data: ships } = useAppSelector(
    (state) => state.ships
  );

  const maxPages = Math.ceil(count / CONSTANTS.OBJECTS_PER_PAGES);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHeroes(`/people/?page=${pageNumber}`));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    dispatch(getFilms('/films/'));
    dispatch(getShips('/starships/'));
  }, [dispatch]);

  const enrichHeroes = (
    heroes: Hero[],
    films: Film[],
    starships: Starship[]
  ) => {
    return heroes?.map((hero) => {
      const heroFilms = hero.films
        ?.map((filmId) => films?.find((film) => film.episode_id === filmId))
        .filter(Boolean) as Film[]; // Приводим к типу Film[]

      const heroStarships = hero.starships
        ?.map((starshipId) =>
          starships?.find((ship) => ship.url.endsWith(`/${starshipId}/`))
        )
        .filter(Boolean) as Starship[]; // Приводим к типу Starship[]

      return {
        ...hero,
        heroFilms,
        heroStarships,
      };
    });
  };

  const updatedHeroes = enrichHeroes(heroes, films, ships);
  console.log(updatedHeroes);

  const incrementPageNumber = () => {
    if (pageNumber < maxPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const decrementPageNumber = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // if (isFetching === false) {
  //   return <div>Loading...</div>; 
  // }

  return (
    <>
      <Header />
      <div>Home page</div>
      <Stack sx={{ gap: '10px', marginTop: '80px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Films</TableCell>
                <TableCell>Ships</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedHeroes&&updatedHeroes.length > 0 ? (
                updatedHeroes.map((hero, i) => (
                  <TableRow key={i}>
                    <TableCell>{hero.name}</TableCell>
                    <TableCell>
                      {hero.heroFilms?.length > 0 ? (
                        hero.heroFilms.map((film) => (
                          <div key={film.id}>{film.title}</div>
                        ))
                      ) : (
                        <div>No Films</div>
                      )}
                    </TableCell>
                    <TableCell>
                      {' '}
                      {hero.heroStarships?.length > 0 ? (
                        hero.heroStarships.map((ship) => (
                          <div key={ship.id}>{ship.name}</div>
                        ))
                      ) : (
                        <div>No Ships</div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3}>No heroes found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          sx={{
            flexDirection: 'row',
            gap: '30px',
            margin: 'auto',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            sx={btnStyle}
            onClick={decrementPageNumber}
          >
            Previous
          </Button>
          {pageNumber}
          <Button
            variant="contained"
            sx={btnStyle}
            onClick={incrementPageNumber}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
