import { Mage } from './mage';
import { Hero } from '../hero';

describe('Mage', () => {
  let mage: Mage;

  beforeEach(() => {
    mage = new Mage();
  });

  test('instance is created', () => {
    expect(mage).toBeTruthy();
  });

  test('it is instance of Mage', () => {
    expect(mage).toBeInstanceOf(Mage);
  });

  test('it is instance of Hero', () => {
    expect(mage).toBeInstanceOf(Hero);
  });
});
