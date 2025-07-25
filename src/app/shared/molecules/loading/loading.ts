import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'ui-loading',
  imports: [],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Loading {
  private readonly loadingService = inject(LoadingService);

  protected isLoading = toSignal(this.loadingService.loading$);
}
