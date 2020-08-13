import { MonsterView } from '../monster-view';

const description = `
  Former spellcaster turned into evil undead after attempting to achieve immortality.
`;

export const litch: Readonly<MonsterView> = Object.freeze({
  name: 'Litch',
  damage: 6,
  specialAction: false,
  image: '...',
  description: description,
});
