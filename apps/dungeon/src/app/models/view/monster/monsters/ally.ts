import { MonsterView } from '../monster-view';

const description = `
  An ally becomes a hero's companion againt the next monster in the dungeon.
`;

export const ally: Readonly<MonsterView> = Object.freeze({
  name: 'Ally',
  damage: false,
  specialAction: 'Becomes companion',
  image: '...',
  description: description,
});
