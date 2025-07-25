import { inject, Injectable, signal } from '@angular/core';
import { BookDataClient } from './book-data-client';
import { BookState, INITIAL_BOOK_STATE } from './interfaces/book.state';
import { map } from 'rxjs';
import { SearchResult } from '../../../shared/organisms/filter-panel/interfaces/filter-panel.interface';

@Injectable({ providedIn: 'root' })
export class BookStore {
  private readonly service = inject(BookDataClient);
  public readonly state = signal<BookState>(INITIAL_BOOK_STATE);

  public getBooks(filters?: SearchResult | null) {
    return this.service.getBooks(filters).pipe(
      map((books) =>
        this.state.update((state) => ({
          ...state,
          books,
          filters: filters ?? state.filters,
        })),
      ),
    );
  }

  public getCategories() {
    return this.service.getCategories().pipe(
      map((categories) =>
        this.state.update((state) => ({
          ...state,
          categories: categories.map((label, id) => ({ label, id })),
        })),
      ),
    );
  }

  public searchBooks() {
    return this.service.searchBooks().pipe(
      map((books) => ({
        rejectCount: books.rejected.length,
        successCount: books.accepted.length,
      })),
    );
  }

  public getBook(bookId: number) {
    return this.service.getBook(bookId);
  }
}
