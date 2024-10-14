import { TestBed } from '@angular/core/testing';

import { ElementTemplatesService } from './elementtemplates.service';

describe('ElementTemplatesService', () => {
  let service: ElementTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
