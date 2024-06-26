import { TestBed } from '@angular/core/testing';

import { AccessTokenInterceptorService } from './access-token-interceptor.service';

describe('AccessTokenInterceptorService', () => {
  let service: AccessTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccessTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
