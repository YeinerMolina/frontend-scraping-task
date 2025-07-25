import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Button } from '../../atoms/button/button';
import { Select } from '../../atoms/select/select';
import { Input } from '../../molecules/input/input';
import {
  FilterPanelData,
  SearchResult,
} from './interfaces/filter-panel.interface';
import { SelectOption } from '../../atoms/select/interfaces/select.interface';
import { Filter } from '../filter/filter';

@Component({
  selector: 'ui-filter-panel',
  templateUrl: './filter-panel.html',
  styleUrls: ['./filter-panel.scss'],
  standalone: true,
  imports: [Button, Select, Input, ReactiveFormsModule, MatDialogModule],
  providers: [],
})
export class FilterPanel {
  private readonly dialogRef = inject(MatDialogRef<FilterPanel>, {
    optional: true,
  });
  protected readonly data = inject<FilterPanelData>(MAT_DIALOG_DATA, {
    optional: true,
  });
  public readonly searchResult = output<SearchResult>();
  public readonly filters = input<Filter | null>(null);

  public readonly placeholder = input<string>(this.data?.placeholder ?? '');
  public readonly options = input<SelectOption[]>(this.data?.options ?? []);

  public readonly form = new FormGroup({
    category: new FormControl<string>(this.data?.filters.category ?? '', {
      nonNullable: true,
    }),
    min: new FormControl<number | null>(this.data?.filters.min ?? null),
    max: new FormControl<number | null>(this.data?.filters.max ?? null),
  });

  protected applyFilters(): void {
    if (this.form.valid) {
      if (this.dialogRef) this.dialogRef.close(this.form.getRawValue());
      else this.searchResult.emit(this.form.getRawValue());
    }
  }

  protected resetFilters(): void {
    this.form.reset({
      category: '',
      min: null,
      max: null,
    });
    if (this.dialogRef) this.dialogRef.close(null);
    else this.searchResult.emit(this.form.getRawValue());
  }
}
