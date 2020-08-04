import { TestBed } from '@angular/core/testing';

import { UIControllerService } from './uicontroller.service';
import { Player } from '../../models/models';

describe('UIControllerService', () => {
  let service: UIControllerService;
  let player: Player;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UIControllerService]
    });
    service = TestBed.inject(UIControllerService);
    player = new Player('John');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('requestChoice', () => {
    it('shoud throw error with only one option', async () => {
      await expect(service.requestChoice({player: player, options: ['one']}))
        .rejects
        .toThrow('requestChoice must be called with at least two options');
    });

    // it should wait for user choice
    // it shoud return a ChoiceResponse
  });

  describe('sendNotification', () => {
    
  });
});
