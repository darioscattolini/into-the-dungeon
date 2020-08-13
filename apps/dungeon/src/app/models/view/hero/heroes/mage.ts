import { HeroView } from './../hero-view';

const description = `
  He is smart, powerful and cold-blooded. Since he discovered his ability to 
  manipulate the flow of multiplanar energy, he has devoted his life to the study
  and excercise of particularly evil magic.
`;

export const mage: Readonly<HeroView> = Object.freeze({
  name: 'mage',
  image: '...',
  description: description,
  features: {
    equipment: []
  }
});
