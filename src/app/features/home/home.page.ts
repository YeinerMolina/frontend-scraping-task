import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { Filter } from '../../shared/organisms/filter/filter';
import { Card } from '../../shared/organisms/card/card';
import { BookStore } from './services/book-store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from '../../core/services/loading.service';
import { finalize } from 'rxjs';
import { SearchResult } from '../../shared/organisms/filter-panel/interfaces/filter-panel.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-home',
  imports: [Filter, Card, RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private readonly bookStore = inject(BookStore);
  private readonly loading = inject(LoadingService);
  private readonly destroyRef = inject(DestroyRef);

  protected get state() {
    return this.bookStore.state;
  }

  ngOnInit() {
    this.getBooks();
    this.getCategories();
  }

  protected getBooks(filters?: SearchResult | null) {
    this.loading.show();
    this.bookStore
      .getBooks(filters)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.hide()),
      )
      .subscribe();
  }

  protected getCategories() {
    this.bookStore
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  protected searchBooks() {
    this.loading.show();
    this.bookStore
      .searchBooks()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.hide()),
      )
      .subscribe();
  }
}
