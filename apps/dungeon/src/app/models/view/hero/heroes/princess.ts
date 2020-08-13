import { HeroView } from './../hero-view';

const description = `
  When she disappears for weeks from his father's court, everybody believes she's 
  out hunting for boyfriends. She is in fact a skilled and brave adventurer, protected 
  by bodyguards and equipped with useful items from his father's treasure.
`;

export const princess: Readonly<HeroView> = Object.freeze({
  name: 'princess',
  image: '...',
  description: description,
  features: {
    equipment: []
  }
});
