import { TestBed, inject } from '@angular/core/testing';

import { TitleRepository } from './title.repository';

describe('TitleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TitleRepository]
    });
  });

  it('should be created', inject([TitleRepository], (repository: TitleRepository) => {
    expect(repository).toBeTruthy();
  }));
});
