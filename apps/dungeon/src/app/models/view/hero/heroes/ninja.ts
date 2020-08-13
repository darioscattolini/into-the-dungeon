import { HeroView } from './../hero-view';

const description = `
  He is stealthy, agile and never misses a hit, nither with his katana nor with 
  his deadful shurikens. While lacking magical abilities, his profound knowledge of
  herbs and potion making helps him stay alive.
`;

export const ninja: Readonly<HeroView> = Object.freeze({
  name: 'ninja',
  image: '...',
  description: description,
  features: {
    equipment: []
  }
});
