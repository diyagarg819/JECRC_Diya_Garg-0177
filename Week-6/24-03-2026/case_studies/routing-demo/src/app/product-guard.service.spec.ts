import { TestBed } from '@angular/core/testing';

import { ProductGuardService } from './product-guard.service';

describe('ProductGuardService', () => {
  let service: ProductGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
