import React, { useState } from 'react';
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
import { EnrichedHero } from '../interfaces';
import HeroGraph from './HeroGraph';

const HeroesList: React.FC<HeroesListProps> = ({
  updatedHeroes,
  pageNumber,
  setPageNumber,
  maxPages,
}) => {
  const btnPrevStyle = {
    maxWidth: '200px',
    width: '100%',
    backgroundColor: pageNumber === 1 ? '#b7b3b3' : '#e25b45',
  };
  const btnNextStyle = {
    maxWidth: '200px',
    width: '100%',
    backgroundColor: pageNumber === maxPages ? '#b7b3b3' : '#e25b45',
  };
  const [selectedHero, setSelectedHero] = useState<EnrichedHero | null>(null);
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
      <Stack sx={{ gap: '10px', marginTop: '20px', marginBottom: '80px' }}>
        <TableContainer
          component={Paper}
          sx={{
            height: '70vh',
            maxWidth: '70%',
            overflowY: 'auto',
            margin: 'auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                  Films&Ships
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {updatedHeroes && updatedHeroes.length > 0 ? (
                updatedHeroes.map((hero, i) => (
                  <TableRow
                    key={i}
                    onClick={() => setSelectedHero(hero)}
                    style={{ cursor: 'pointer' }}
                  >
                    <TableCell
                      sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#e25b45',
                      }}
                    >
                      {hero.name}
                    </TableCell>
                    <TableCell>
                      {hero.heroFilms?.length > 0 ? (
                        hero.heroFilms.map((film) => (
                          <div key={film.id}>
                            <p
                              style={{
                                fontSize: '16px',
                                fontWeight: 600,
                                color: 'green',
                              }}
                            >
                              {film.title}
                            </p>
                            {/* Displaying ships for each movie*/}
                            {hero.heroStarships?.length > 0 ? (
                              <ul>
                                {hero.heroStarships.map((ship) => (
                                  <li key={ship.id}>{ship.name}</li>
                                ))}
                              </ul>
                            ) : (
                              <div>No Ships</div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div>No Films</div>
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
      </Stack>

      <Stack
        sx={{
          flexDirection: 'row',
          gap: '30px',
          margin: '0px auto 40px auto',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={btnPrevStyle}
          onClick={decrementPageNumber}
        >
          Previous
        </Button>
        {pageNumber}
        <Button
          variant="contained"
          sx={btnNextStyle}
          onClick={incrementPageNumber}
        >
          Next
        </Button>
      </Stack>
      {/*Display the graph for the selected hero */}
      {selectedHero && <HeroGraph hero={selectedHero} />}
    </>
  );
};
export default HeroesList;
