import React from 'react';
import { render, screen } from '@testing-library/react';
import HeroesList from '../HeroesList';

// mok data
const mockHeroes = [
  { id: 1, name: 'Luke Skywalker' },
  { id: 2, name: 'Darth Vader' },
];

// mok data with long hero name
const mockHeroesWithLongName = [
  { id: 1, name: 'Luke Skywalker with an extremely long name that exceeds the usual limit' },
];

describe('HeroesList Prop Tests', () => {
  
  // test for max length string
  test('renders hero list with long name without crashing', () => {
    render(<HeroesList updatedHeroes={mockHeroesWithLongName} pageNumber={1} setSelectedHero={() => {}} />);
    
    // Check that the long name is displayed correctly
    const longNameHero = screen.getByText(/Luke Skywalker with an extremely long name/i);
    expect(longNameHero).toBeInTheDocument();
  });

  // Test with empty hero array
  test('renders empty hero list without crashing', () => {
    render(<HeroesList updatedHeroes={[]} pageNumber={1} setSelectedHero={() => {}} />);

    // We check that the component does not generate errors and renders correctly
    const noHeroesMessage = screen.queryByText(/Luke Skywalker/i); //message about heroes is missing
    expect(noHeroesMessage).toBeNull(); // we expect that the heroes will not be displayed
  });
  
});
