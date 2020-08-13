import { MonsterView } from '../monster-view';

const description = `
  Invisible viscous trapping substance to which equipment sticks when passing by.
`;

export const jellyCube: Readonly<MonsterView> = Object.freeze({
  name: 'Jelly Cube',
  damage: false,
  specialAction: 'Retains one piece of equipment, unless hero goes naked',
  image: '...',
  description: description,
});
