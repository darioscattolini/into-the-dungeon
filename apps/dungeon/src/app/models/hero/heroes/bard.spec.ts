import { Bard } from './bard';
import { Hero } from '../hero';

describe('Bard', () => {
  let bard: Bard;

  beforeEach(() => {
    bard = new Bard();
  });

  it('should create an instance', () => {
    expect(bard).toBeTruthy();
  });

  it('should create an instance of Bard', () => {
    expect(bard instanceof Bard).toBe(true);
  });

  it('should create an instance of Hero', () => {
    expect(bard instanceof Hero).toBe(true);
  });
});
