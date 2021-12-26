import { TestBed } from '@angular/core/testing';

import { AcademiaService } from './academia.service';

describe('AcademiaService', () => {
  let service: AcademiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
