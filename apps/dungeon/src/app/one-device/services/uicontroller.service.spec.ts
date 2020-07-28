import { TestBed, fakeAsync } from '@angular/core/testing';

import { UIControllerService } from './uicontroller.service';

describe('UIControllerService', () => {
  let service: UIControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UIControllerService]
    });
    service = TestBed.inject(UIControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('requestChoice', () => {
    it('shoud throw error with only one option', async () => {
      await expect(service.requestChoice({player: 'player', options: ['one']}))
        .rejects
        .toThrow('requestChoice must be called with at least two options');
    });

    // it should wait for user choice
    // it shoud return a ChoiceResponse
  });
});
