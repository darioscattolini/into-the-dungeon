import { MonsterView } from '../monster-view';

const description = `
  Mighty shapeshifter. The deeper it lurks in a dungeon, the more powerful is 
  the creature it becomes.
`;

export const metamorph: Readonly<MonsterView> = Object.freeze({
  name: 'Metamorph',
  damage: false,
  specialAction: 'Becomes creature with damage equal to its position in dungeon',
  image: '...',
  description: description,
});
