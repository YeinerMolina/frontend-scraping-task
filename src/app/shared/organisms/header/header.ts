import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { Brand } from '../../molecules/brand/brand';
import { Button } from '../../atoms/button/button';
import { RouterLink } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { BookStore } from '../../../features/home/services/book-store';
import { finalize, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'ui-header',
  imports: [Brand, Button, RouterLink, MatSnackBarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly bookStore = inject(BookStore);
  private readonly loading = inject(LoadingService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);

  protected searchBooks() {
    this.loading.show();
    this.bookStore
      .searchBooks()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((count) =>
          this.showMessage(
            `Libros encontrados: ${count.successCount}, errores: ${count.rejectCount}`,
          ),
        ),
        switchMap(() => this.bookStore.getBooks()),
        switchMap(() => this.bookStore.getCategories()),
        finalize(() => this.loading.hide()),
      )

      .subscribe();
  }

  private showMessage(message: string): void {
    this.snackBar.open(message, 'Cerrar');
  }
}
