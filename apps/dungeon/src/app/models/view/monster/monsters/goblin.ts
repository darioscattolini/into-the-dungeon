import { MonsterView } from '../monster-view';

const description = `
  Small and weak creature, particularly greedy for gold and jewelry.
`;

export const goblin: Readonly<MonsterView> = Object.freeze({
  name: 'Goblin',
  damage: 1,
  specialAction: false,
  image: '...',
  description: description,
});
