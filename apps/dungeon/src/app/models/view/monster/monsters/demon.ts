import { MonsterView } from '../monster-view';

const description = `
  Powerful, ancestral and evil creature that managed to escape the underworld.
`;

export const demon: Readonly<MonsterView> = Object.freeze({
  name: 'Demon',
  damage: 7,
  specialAction: false,
  image: '...',
  description: description,
});
