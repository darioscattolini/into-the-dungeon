import { MonsterView } from '../monster-view';

const description = `
  Smart and long-lived magical reptile, one of the most powerful creatures on earth.
`;

export const dragon: Readonly<MonsterView> = Object.freeze({
  name: 'Dragon',
  damage: 9,
  specialAction: false,
  image: '...',
  description: description,
});
