import { TestBed, inject } from '@angular/core/testing';

import { DataselectorService } from './dataselector.service';

describe('DataselectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataselectorService]
    });
  });

  it('should be created', inject([DataselectorService], (service: DataselectorService) => {
    expect(service).toBeTruthy();
  }));
});
