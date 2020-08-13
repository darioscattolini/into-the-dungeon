import { MonsterView } from '../monster-view';

const description = `
  A little flying creature with no effect against heroes.
`;

export const fairy: Readonly<MonsterView> = Object.freeze({
  name: 'Fairy',
  damage: 0,
  specialAction: false,
  image: '...',
  description: description,
});
