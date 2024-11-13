import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { EnrichedHero, Film, Starship } from '../interfaces';

interface HeroGraphProps {
  hero: EnrichedHero | null;  // The chosen hero
}

type SelectedItem = EnrichedHero | Film | Starship | null; // Type for storing information about the selected element

const HeroGraph: React.FC<HeroGraphProps> = ({ hero }) => {
  const [selectedItem, setSelectedItem] = useState<SelectedItem>(null); // To store the selected element (hero, movie or ship)

  if (!hero) return null;

  // We create nodes for the hero, films and ships
  const nodes: Node[] = [
    {
      id: `hero-${hero.name}`,
      data: { label: hero.name },
      position: { x: 250, y: 0 },
      type: 'default',
    },
    ...hero.heroFilms.map((film, index) => ({
      id: `film-${film.title}`,
      data: { label: film.title },
      position: { x: 200 * index, y: 150 },
      type: 'default',
    })),
    ...hero.heroStarships.map((starship, index) => ({
      id: `starship-${starship.name}`,
      data: { label: starship.name },
      position: { x: 200 * index, y: 300 },
      type: 'default',
    })),
  ];

  // Linking the hero to the films
  const edges: Edge[] = [
    ...hero.heroFilms.map((film) => ({
      id: `hero-${hero.name}-film-${film.title}`,
      source: `hero-${hero.name}`,
      target: `film-${film.title}`,
      type: 'default',
    })),
  ];

  // Linking the ships to the film
  const filmEdges: Edge[] = hero.heroFilms.map((film) =>
    hero.heroStarships.map((starship) => ({
      id: `film-${film.title}-starship-${starship.name}`,
      source: `film-${film.title}`,
      target: `starship-${starship.name}`,
      type: 'default',
    }))
  ).flat();

  // Node click handler
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.id.startsWith('hero-')) {
      setSelectedItem(hero); //The hero has been chosen
    } else if (node.id.startsWith('film-')) {
      const filmTitle = node.id.replace('film-', '');
      const selectedFilm = hero.heroFilms.find((film) => film.title === filmTitle);
      setSelectedItem(selectedFilm || null); // Movie selected
    } else if (node.id.startsWith('starship-')) {
      const starshipName = node.id.replace('starship-', '');
      const selectedStarship = hero.heroStarships.find((starship) => starship.name === starshipName);
      setSelectedItem(selectedStarship || null); //The ship has been selected
    }
  };

  //Display information about the selected item in the sidebar
  const renderSidebarInfo = () => {
    if (!selectedItem) return <div>No item selected</div>;

    // Check if the selected element is a hero
    if ('name' in selectedItem && 'heroFilms' in selectedItem) {
      return (
        <>
          <h3>Hero: {selectedItem.name}</h3>
          <p>Number of films: {selectedItem.heroFilms.length}</p>
          <p>Number of starships: {selectedItem.heroStarships.length}</p>
          <p>Birth year: {selectedItem.birthYear}</p>
          <p>Height: {selectedItem.height}</p>
          <p>Gender: {selectedItem.gender}</p>

        </>
      );
    }

    //Check if the selected item is a movie
    if ('title' in selectedItem) {
      return (
        <>
          <h3>Film: {selectedItem.title}</h3>
          <p>Episode: {selectedItem.episodeId}</p>
          <p>Release date: {selectedItem.releaseDate}</p>
          <p>Director: {selectedItem.director}</p>
          <p>Producer: {selectedItem.producer}</p>
        </>
      );
    }

    // Check if the selected element is a ship
    if ('model' in selectedItem) {
      return (
        <>
          <h3>Starship: {selectedItem.name}</h3>
          <p>Model: {selectedItem.model}</p>
          <p>Manufacturer: {selectedItem.manufacturer}</p>
          <p>Hyperdrive rating: {selectedItem.hyperdriveRating}</p>
        </>
      );
    }

    return <div>No details available</div>;
};

  return (
    <div style={{ display: 'flex', height: '500px', width: '100%',margin:'auto'}}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={[...edges, ...filmEdges]} // Adding connections to ships
          onNodeClick={onNodeClick} // Add a click handler to the node
          defaultViewport={{x: 100, y: 0, zoom: 1}}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div style={{ maxWidth: '150px', padding: '10px', borderLeft: '1px solid #ccc' }}>
        {renderSidebarInfo()}
      </div>
    </div>
  );
};

export default HeroGraph;
