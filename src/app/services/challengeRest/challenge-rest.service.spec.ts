import { TestBed } from '@angular/core/testing';

import { ChallengeRestService } from './challenge-rest.service';

describe('ChallengeRestService', () => {
  let service: ChallengeRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengeRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
