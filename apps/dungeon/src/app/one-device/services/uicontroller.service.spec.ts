import { TestBed } from '@angular/core/testing';

import { UIControllerService } from './uicontroller.service';

describe('UIControllerService', () => {
  let service: UIControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('requestChoice', () => {
    it('shoud throw error with no parameter', () => {
      expect(service.requestChoice())
        .toThrow('requestChoice must be called with a ChoiceRequest parameter');
    });

    it('shoud throw error with empty parameter', () => {
      expect(service.requestChoice({}))
        .toThrow('requestChoice must be called with a ChoiceRequest parameter');
    });

    it('shoud throw error with incomplete parameter', () => {
      expect(service.requestChoice({player: 'player'}))
        .toThrow('requestChoice must be called with a ChoiceRequest parameter');
    });

    it('shoud throw error with incomplete parameter', () => {
      expect(service.requestChoice({options: ['one', 'two']}))
        .toThrow('requestChoice must be called with a ChoiceRequest parameter');
    });

    it('shoud throw error with only one option', () => {
      expect(service.requestAction({player: 'player', options: ['one']}))
        .toThrow('requestChoice must be called with a ChoiceRequest parameter');
    });

    // it should wait for user choice
    // it shoud return a ChoiceResponse
  });
});
