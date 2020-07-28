import { Princess } from './princess';
import { Hero } from '../hero';

describe('Princess', () => {
  let princess: Princess;

  beforeEach(() => {
    princess = new Princess();
  });

  it('should create an instance', () => {
    expect(princess).toBeTruthy();
  });

  it('should create an instance of Princess', () => {
    expect(princess instanceof Princess).toBe(true);
  });

  it('should create an instance of Hero', () => {
    expect(princess instanceof Hero).toBe(true);
  });
});
