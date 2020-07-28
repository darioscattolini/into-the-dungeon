import { TestBed } from '@angular/core/testing';

import { HeroesService } from './heroes.service';
import { Bard, Princess, Mage, Ninja } from '../../models/models';

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

  describe('getHeroes', () => {
    it('should retrieve an array with four members', () => {
      expect(service.getHeroes()).toHaveLength(4);
    });

    it('should return an array containing Bard class', () => {
      expect(service.getHeroes()).toContain(Bard);
    });

    it('should return an array containin Mage class', () => {
      expect(service.getHeroes()).toContain(Mage);
    });

    it('should return an array containin Ninja class', () => {
      expect(service.getHeroes()).toContain(Ninja);
    });
    
    it('should return an array containing Princess class', () => {
      expect(service.getHeroes()).toContain(Princess);
    });
  });
});
