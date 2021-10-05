import { TestBed } from '@angular/core/testing';

import { CheckountsService } from './checkounts.service';

describe('CheckountsService', () => {
  let service: CheckountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
