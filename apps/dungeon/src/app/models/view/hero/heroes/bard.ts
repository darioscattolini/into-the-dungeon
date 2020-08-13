import { HeroView } from './../hero-view';

const description = `
  Blabbermouth, boastful and stylish, he looks like the most unsuitable adventurer. 
  However, powerful charming skills, the lore he acquired along his travels and 
  supernatural luck have proven otherwise.
`;

export const bard: Readonly<HeroView> = Object.freeze({
  name: 'bard',
  image: '...',
  description: description,
  features: {
    equipment: []
  }
});
