import { TestBed } from '@angular/core/testing';

import { RaidService } from './raid.service';

describe('DungeonService', () => {
  let service: RaidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
