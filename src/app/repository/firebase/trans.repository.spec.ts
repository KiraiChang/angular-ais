import { TestBed, inject } from '@angular/core/testing';

import { TransRepository } from './trans.repository';

describe('TransRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransRepository]
    });
  });

  it('should be created', inject([TransRepository], (repository: TransRepository) => {
    expect(repository).toBeTruthy();
  }));
});
