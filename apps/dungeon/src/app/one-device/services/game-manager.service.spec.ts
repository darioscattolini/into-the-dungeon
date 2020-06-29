import { TestBed } from '@angular/core/testing';

import { GameManagerService } from './game-manager.service';

describe('GameManagerService', () => {
  let service: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GameManagerService] });
    service = TestBed.inject(GameManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAmountOfPlayers', () => {
    it('should return 0 when service is created', () => {
      expect(service.getAmountOfPlayers()).toStrictEqual(0);
    });
  })
});
