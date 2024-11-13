import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { getHeroes } from '../store/slices/heroesSlice';
import { getFilms } from '../store/slices/filmsSlice';
import { getShips } from '../store/slices/shipsSlice';
import { Box, Stack, CircularProgress } from '@mui/material';
import { EnrichedHero, Hero, Film, Starship } from '../interfaces';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import CONSTANTS from '../constants';
import HeroesList from '../components/HeroesList';
const Home = () => {
  // Get page number from URL or set 1 as default
  const initialPageNumber = Number(new URLSearchParams(window.location.search).get('page')) || 1;
  const [pageNumber, setPageNumber] = useState(initialPageNumber);

  const { count, results: heroes } = useAppSelector(
    (state) => state.heroes.data
  );

  const { results: films } = useAppSelector((state) => state.films.data);
  const { isFetching, data: ships } = useAppSelector((state) => state.ships);

  const maxPages = Math.ceil(count / CONSTANTS.OBJECTS_PER_PAGES);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getHeroes(`/people/?page=${pageNumber}`));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    dispatch(getFilms('/films/'));
    dispatch(getShips('/starships/'));
  }, [dispatch]);

  useEffect(() => {
    //Update URL when page number changes
    const params = new URLSearchParams(window.location.search);
    params.set('page', pageNumber.toString());
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [pageNumber]);

  const enrichHeroes = (
    heroes: Hero[],
    films: Film[],
    starships: Starship[]
  ) => {
    return heroes?.map((hero) => {
      const heroFilms = hero.films
        ?.map((filmId: number) =>
          films?.find((film) => film.episodeId === filmId)
        )
        .filter(Boolean) as Film[]; // Cast to type Film[]

      const validStarships = Array.isArray(starships) ? starships : [];
      const heroStarships = hero.starships
        ?.map((starshipId: number) =>
          validStarships?.find((ship) => ship.url.endsWith(`/${starshipId}/`))
        )
        .filter(Boolean) as Starship[]; // Cast to type Starship[]

      return {
        ...hero,
        heroFilms,
        heroStarships,
      };
    });
  };

  const updatedHeroes: EnrichedHero[] = enrichHeroes(heroes, films, ships);

  return (
    <>
      <Header />
      {isFetching ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
          <span style={{ marginLeft: '10px' }}>Loading...</span>
        </Box>
      ) : (
        <Stack mt="80px">
          <Box component="h1" sx={{ textAlign: 'center' }}>
            Heroes list
          </Box>
          <HeroesList
            updatedHeroes={updatedHeroes}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            maxPages={maxPages}
          />
        </Stack>
      )}
    </>
  );
};

export default Home;
