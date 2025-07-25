import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../../atoms/button/button';
import { FilterPanel } from '../filter-panel/filter-panel';
import { SelectOption } from '../../atoms/select/interfaces/select.interface';
import { SearchResult } from '../filter-panel/interfaces/filter-panel.interface';

@Component({
  selector: 'ui-filter',
  imports: [MatDialogModule, MatIconModule, Button, FilterPanel],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Filter {
  private readonly dialog = inject(MatDialog);

  public readonly options = input<SelectOption[]>([]);
  public readonly filters = input<SearchResult | null>(null);
  public readonly searchResult = output<SearchResult | null>();

  protected openDialog() {
    const dialogRef = this.dialog.open(FilterPanel, {
      data: {
        options: this.options(),
        filters: this.filters(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === undefined) return;
      this.searchResult.emit(result);
    });
  }
}
