import { MonsterView } from '../monster-view';

const description = `
  A powerful vampire that only reveals its true form to successful raiders.
`;

export const dracula: Readonly<MonsterView> = Object.freeze({
  name: 'Dracula',
  damage: 8,
  specialAction: 'Is common Vampire (dmg: 4) for players without successful raid',
  image: '...',
  description: description,
});
