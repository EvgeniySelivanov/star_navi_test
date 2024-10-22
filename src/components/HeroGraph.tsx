import React, { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { EnrichedHero } from '../interfaces';

interface HeroGraphProps {
  hero: EnrichedHero | null;  // Выбранный герой
}

const HeroGraph: React.FC<HeroGraphProps> = ({ hero }) => {
  const [selectedFilm, setSelectedFilm] = useState<string | null>(null); // Для хранения выбранного фильма

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

  // Связываем героя с фильмами
  const edges: Edge[] = [
    ...hero.heroFilms.map((film) => ({
      id: `hero-${hero.name}-film-${film.title}`,
      source: `hero-${hero.name}`,
      target: `film-${film.title}`,
      type: 'default',
    })),
  ];

  // Связываем корабли с фильмом только при выборе фильма
  const filmEdges: Edge[] =
    selectedFilm
      ? hero.heroStarships.map((starship) => ({
          id: `film-${selectedFilm}-starship-${starship.name}`,
          source: `film-${selectedFilm}`,
          target: `starship-${starship.name}`,
          type: 'default',
        }))
      : [];

  // Обработчик клика на узел фильма
  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    if (node.id.startsWith('film-')) {
      const filmTitle = node.id.replace('film-', '');
      setSelectedFilm(filmTitle); // Устанавливаем выбранный фильм
    }
  };

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={[...edges, ...filmEdges]} // Добавляем связи к кораблям только для выбранного фильма
        onNodeClick={onNodeClick} // Добавляем обработчик клика на узел
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HeroGraph;
