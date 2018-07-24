import { TestBed, inject } from '@angular/core/testing';

import { EntryRepository } from './entry.repository';

describe('EntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryRepository]
    });
  });

  it('should be created', inject([EntryRepository], (repository: EntryRepository) => {
    expect(repository).toBeTruthy();
  }));
});
