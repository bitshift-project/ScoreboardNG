import { TestBed } from '@angular/core/testing';

import { ScoreboardRestService } from './scoreboard-rest.service';

describe('ScoreboardRestService', () => {
  let service: ScoreboardRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreboardRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
