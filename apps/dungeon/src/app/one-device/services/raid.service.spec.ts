import { TestBed } from '@angular/core/testing';

import { RaidService } from './raid.service';

describe('RaidService', () => {
  let service: RaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaidService]
    });
    service = TestBed.inject(RaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
