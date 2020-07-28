import { Mage } from './mage';
import { Hero } from '../hero';

describe('Mage', () => {
  let mage: Mage;

  beforeEach(() => {
    mage = new Mage();
  });

  it('should create an instance', () => {
    expect(mage).toBeTruthy();
  });

  it('should create an instance of Mage', () => {
    expect(mage instanceof Mage).toBe(true);
  });

  it('should create an instance of Hero', () => {
    expect(mage instanceof Hero).toBe(true);
  });
});
