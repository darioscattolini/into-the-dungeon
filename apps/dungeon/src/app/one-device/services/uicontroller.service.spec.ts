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

  test('it is created', () => {
    expect(service).toBeTruthy();
  });

  describe('requestChoice', () => {
    test('it throws error with only one option', async () => {
      expect.assertions(1);
      
      try { await service.requestChoice({player: player, options: ['one']}); }
      catch(error) { 
        expect(error.message).toEqualCaseInsensitive(
          'requestChoice must be called with at least two options'
        );
      }
    });

    // it should wait for user choice
    // it shoud return a ChoiceResponse
  });

  describe('sendNotification', () => {
    
  });
});
