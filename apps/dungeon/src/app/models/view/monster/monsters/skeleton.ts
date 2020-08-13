import { MonsterView } from '../monster-view';

const description = `
  Humanoid remains returned from the dead by an evil spellcaster.
`;

export const skeleton: Readonly<MonsterView> = Object.freeze({
  name: 'Skeleton',
  damage: 2,
  specialAction: false,
  image: '...',
  description: description,
});
