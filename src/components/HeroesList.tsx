import * as React from 'react';
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
import { HeroesListProps } from '../interfaces';

const HeroesList: React.FC<HeroesListProps> = ({
  updatedHeroes,
  pageNumber,
  setPageNumber,
  maxPages,
}) => {
  const btnPrevStyle = {
    maxWidth: '200px',
    width: '100%',
    backgroundColor:pageNumber===1?'#b7b3b3':'#e25b45'
  };
  const btnNextStyle = {
    maxWidth: '200px',
    width: '100%',
    backgroundColor:pageNumber===maxPages?'#b7b3b3':'#e25b45'
  };
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
    <Stack sx={{ gap: '10px', marginTop: '80px',marginBottom:'80px' }}>
      <TableContainer component={Paper}  
      sx={{ 
          height: '70vh',
          maxWidth: '70%', 
          overflowY: 'auto',
          margin:'auto'
        }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize:'20px',fontWeight:'bold'}}>Name</TableCell>
              <TableCell sx={{fontSize:'20px',fontWeight:'bold'}}>Films</TableCell>
              <TableCell sx={{fontSize:'20px',fontWeight:'bold'}}>Ships</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {updatedHeroes && updatedHeroes.length > 0 ? (
              updatedHeroes.map((hero, i) => (
                <TableRow key={i}>
                  <TableCell sx={{fontSize:'14px',fontWeight:'bold'}}>{hero.name}</TableCell>
                  <TableCell sx={{fontSize:'14px',fontWeight:'bold'}}>
                    {hero.heroFilms?.length > 0 ? (
                      hero.heroFilms.map((film) => (
                        <div key={film.id}>{film.title}</div>
                      ))
                    ) : (
                      <div>No Films</div>
                    )}
                  </TableCell>
                  <TableCell sx={{fontSize:'14px',fontWeight:'bold'}}>
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
        <Button variant="contained" sx={btnPrevStyle} onClick={decrementPageNumber}>
          Previous
        </Button>
        {pageNumber}
        <Button variant="contained" sx={btnNextStyle} onClick={incrementPageNumber}>
          Next
        </Button>
      </Stack>
    </Stack>
  );
};
export default HeroesList;
