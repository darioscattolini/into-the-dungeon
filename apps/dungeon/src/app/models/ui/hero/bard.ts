import { IHero } from './ihero';

const description = `
  Blabbermouth, boastful and stylish, he looks like the most unsuitable adventurer. 
  However, powerful charming skills, the lore he acquired along his travels and 
  supernatural luck have proven otherwise.
`;

export const bard: Readonly<IHero> = Object.freeze({
  name: 'Bard',
  image: '...',
  description: description,
  features: {
    equipment: []
  }
});
