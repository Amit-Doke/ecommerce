/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadingServiceService } from './loadingService.service';

describe('Service: LoadingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingServiceService]
    });
  });

  it('should ...', inject([LoadingServiceService], (service: LoadingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
