import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { heroes, IHero, Bard, Mage, Ninja, Princess } from '../../models/models';

describe('HeroesService', () => {
  let service: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService]
    });
    service = TestBed.inject(HeroesService);
  });
  
  describe('constructor', () => {
    it('should create service', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('getHeroesUIData', () => {
    let heroesUIData: IHero[];

    beforeEach(() => {
      heroesUIData = heroes;
    });

    it('should return an array containing heroesUIData members', () => {
      expect(service.getHeroesUIData()).toHaveLength(heroesUIData.length);
      expect(service.getHeroesUIData())
        .toEqual(expect.arrayContaining(heroesUIData));
    });
  });

  describe('getHero', () => {
    it('should return an instance of Bard if called with "Bard"', () => {
      expect(service.getHero('Bard') instanceof Bard).toBe(true)
    });

    it('should return an instance of Mage if called with "Mage"', () => {
      expect(service.getHero('Mage') instanceof Mage).toBe(true)
    });

    it('should return an instance of Ninja if called with "Ninja"', () => {
      expect(service.getHero('Ninja') instanceof Ninja).toBe(true)
    });

    it('should return an instance of Princess if called with "Princess"', () => {
      expect(service.getHero('Princess') instanceof Princess).toBe(true)
    });
  });
});
