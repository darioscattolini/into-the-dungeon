import { Bard } from './bard';
import { Hero } from '../hero';

describe('Bard', () => {
  let bard: Bard;

  beforeEach(() => {
    bard = new Bard();
  });

  test('instance is created', () => {
    expect(bard).toBeTruthy();
  });

  test('it is instance of Bard', () => {
    expect(bard).toBeInstanceOf(Bard);
  });

  test('it is instance of Hero', () => {
    expect(bard).toBeInstanceOf(Hero);
  });
});
