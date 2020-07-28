import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { heroes, IHero } from '../../models/models';

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
});
