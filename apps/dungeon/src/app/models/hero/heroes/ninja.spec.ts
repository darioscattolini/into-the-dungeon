import { Ninja } from './ninja';
import { Hero } from '../hero';

describe('Ninja', () => {
  let ninja: Ninja;

  beforeEach(() => {
    ninja = new Ninja();
  });

  it('should create an instance', () => {
    expect(ninja).toBeTruthy();
  });

  it('should create an instance of Ninja', () => {
    expect(ninja instanceof Ninja).toBe(true);
  });

  it('should create an instance of Hero', () => {
    expect(ninja instanceof Hero).toBe(true);
  });
});
