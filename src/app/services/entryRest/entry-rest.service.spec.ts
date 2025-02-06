import { TestBed } from '@angular/core/testing';

import { EntryRestService } from './entry-rest.service';

describe('EntryRestService', () => {
  let service: EntryRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
