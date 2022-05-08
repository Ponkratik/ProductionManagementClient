import { TestBed } from '@angular/core/testing';

import { OperationComponentService } from './operation-component.service';

describe('OperationComponentService', () => {
  let service: OperationComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
