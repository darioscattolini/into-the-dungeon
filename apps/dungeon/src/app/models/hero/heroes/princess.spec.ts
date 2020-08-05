import { Princess } from './princess';
import { Hero } from '../hero';

describe('Princess', () => {
  let princess: Princess;

  beforeEach(() => {
    princess = new Princess();
  });

  test('instance is created', () => {
    expect(princess).toBeTruthy();
  });

  test('it is instance of Princess', () => {
    expect(princess).toBeInstanceOf(Princess);
  });

  test('it is instance of Hero', () => {
    expect(princess).toBeInstanceOf(Hero);
  });
});
