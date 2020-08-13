import { MonsterView } from '../monster-view';

const description = `
  Extremely odd creature whose strength mimics its opponent's.
`;

export const mimic: Readonly<MonsterView> = Object.freeze({
  name: 'Mimic',
  damage: false,
  specialAction: 'Damage equal to hero\'s equipment items amount',
  image: '...',
  description: description,
});
