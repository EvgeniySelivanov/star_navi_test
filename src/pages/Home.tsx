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
  Link,
} from '@mui/material';
import { useAppDispatch } from '../utils/hooks';
import { useAppSelector } from '../utils/hooks';
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
}
const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { count,results } = useAppSelector((state) => state.heroes.data);
  const maxPages = Math.floor(count / CONSTANTS.OBJECTS_PER_PAGES);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getHeroes(`/people/?page=${pageNumber}`));
    dispatch(getFilms('/films/'));
    dispatch(getShips('/starships/'));
  }, [dispatch, pageNumber]);

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
  return (
    <>
      <Header />
      <div>Home page</div>
      <Stack sx={{ gap: '10px' }}>
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
                {results.map((hero:Hero,i:number) => (
                  <TableRow key={i}>
                    <TableCell>{hero.name}</TableCell>
                    <TableCell>
                      xxx
                    </TableCell>
                    <TableCell>
                    yyy
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        <Stack sx={{flexDirection:'row',gap:'30px',margin:'auto',alignItems:'center'}}>
          <Button variant="contained" sx={btnStyle} onClick={decrementPageNumber}>
            Previous
          </Button>
          {pageNumber}
          <Button variant="contained" sx={btnStyle} onClick={incrementPageNumber}>
            Next
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
