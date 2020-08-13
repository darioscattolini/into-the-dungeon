import { MonsterView } from '../monster-view';

const description = `
  Strong magical creature created from stone by a wizard's spell.
`;

export const golem: Readonly<MonsterView> = Object.freeze({
  name: 'Golem',
  damage: 5,
  specialAction: false,
  image: '...',
  description: description,
});
