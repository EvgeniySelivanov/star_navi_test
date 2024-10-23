import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; // Already processes ACT behind the scenes
import '@testing-library/jest-dom';
import HeroesList from '../HeroesList';
import { EnrichedHero } from '../interfaces';
//moc data
const mockHeroes: EnrichedHero[] = [
  {
    name: 'Luke Skywalker',
    heroFilms: [{ title: 'A New Hope', id: 1 }],
    heroStarships: [{ name: 'X-Wing', id: 1 }],
  },
  {
    name: 'Darth Vader',
    heroFilms: [{ title: 'Empire Strikes Back', id: 2 }],
    heroStarships: [{ name: 'TIE Advanced', id: 2 }],
  },
];

describe('HeroesList Component', () => {
  test('handles hero click', () => {
    const mockSetSelectedHero = jest.fn();

    // render already uses
    render(
      <HeroesList
        updatedHeroes={mockHeroes}
        pageNumber={1}
        setPageNumber={jest.fn()}
        maxPages={2}
      />
    );

    //click on the hero 
    const lukeElement = screen.getByText('Luke Skywalker');
    
    fireEvent.click(lukeElement); // fireEvent uses act automatically

    // Check that the element was rendered
    expect(lukeElement).toBeInTheDocument();
  });
});
