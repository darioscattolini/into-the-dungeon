import { Ninja } from './ninja';
import { Hero } from '../hero';

describe('Ninja', () => {
  let ninja: Ninja;

  beforeEach(() => {
    ninja = new Ninja();
  });

  test('instance is created', () => {
    expect(ninja).toBeTruthy();
  });

  test('it is instance of Ninja', () => {
    expect(ninja).toBeInstanceOf(Ninja);
  });

  test('it is instance of Hero', () => {
    expect(ninja).toBeInstanceOf(Hero);
  });
});
