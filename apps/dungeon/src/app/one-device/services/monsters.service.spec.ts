import { TestBed } from '@angular/core/testing';

import { MonstersService } from './monsters.service';
import { Monster } from '../../models/models';

describe('MonstersService', () => {
  let service: MonstersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonstersService]
    });
    service = TestBed.inject(MonstersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMonstersMace', () => {
    let monstersMace: Monster[];
    
    beforeEach(() => {
      monstersMace = service.getMonstersMace();
    });

    it('should return array of 15 members', () => {
      expect(monstersMace).toHaveLength(15);
    });

    it('should return array of monsters', () => {
      expect(monstersMace.every(monster => monster instanceof Monster))
        .toBe(true);
    });
  });
});
