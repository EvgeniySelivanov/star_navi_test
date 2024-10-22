import React from 'react';
import ReactFlow, { Background, Controls, MiniMap, Node, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import { EnrichedHero } from '../interfaces';

interface HeroGraphProps {
  hero: EnrichedHero | null;  // Выбранный герой
}

const HeroGraph: React.FC<HeroGraphProps> = ({ hero }) => {
  if (!hero) return null;

  // Создаем узлы для героя, фильмов и кораблей
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

  // Создаем связи между узлами (связываем героя с фильмами и кораблями)
  const edges: Edge[] = [
    // Связываем героя с фильмами
    ...hero.heroFilms.map((film) => ({
      id: `hero-${hero.name}-film-${film.title}`,
      source: `hero-${hero.name}`,
      target: `film-${film.title}`,
      type: 'default',
    })),
    // Связываем фильмы с соответствующими кораблями
    ...hero.heroFilms.flatMap((film) => (
      hero.heroStarships.map((starship) => ({
        id: `film-${film.title}-starship-${starship.name}`,
        source: `film-${film.title}`,
        target: `starship-${starship.name}`,
        type: 'default',
      }))
    )),
  ];

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HeroGraph;
