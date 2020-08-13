import { MonsterView } from '../monster-view';

const description = `
  It avoids death by sucking other creatures' blood to steal their life force.
`;

export const vampire: Readonly<MonsterView> = Object.freeze({
  name: 'Vampire',
  damage: 4,
  specialAction: false,
  image: '...',
  description: description,
});
