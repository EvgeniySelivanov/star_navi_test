import React, { useEffect } from 'react';
import Header from '../components/Header';
import { getHeroes } from '../store/slices/heroesSlice';
import { getFilms } from '../store/slices/filmsSlice';

import { useAppDispatch } from '../utils/hooks';
const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getHeroes('/people'));
    dispatch(getFilms('/films'));

  }, [dispatch]);
  return (
    <>
      <Header />
      <div>Home page</div>
    </>
  );
};

export default Home;
