import { MonsterView } from '../monster-view';

const description = `
  Evil and smart humanoid creature of medium strength.
`;

export const orc: Readonly<MonsterView> = Object.freeze({
  name: 'Orc',
  damage: 3,
  specialAction: false,
  image: '...',
  description: description,
});
