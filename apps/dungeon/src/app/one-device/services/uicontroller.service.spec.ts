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
});
