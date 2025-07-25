import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { Book } from '../home/services/interfaces/book.interface';
import { BookStore } from '../home/services/book-store';
import { Rating } from '../../shared/molecules/rating/rating';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-book-detail',
  imports: [Rating],
  templateUrl: './book-detail.page.html',
  styleUrl: './book-detail.page.scss',
  providers: [BookStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailPage {
  private readonly bookStore = inject(BookStore);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly book = signal<Book | null>(null);

  ngOnInit() {
    const bookId = this.route.snapshot.params['id'];
    this.getBook(bookId);
  }

  private getBook(bookId: number) {
    this.bookStore
      .getBook(bookId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (book) => this.book.set(book) });
  }
}
