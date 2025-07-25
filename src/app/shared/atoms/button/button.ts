import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ui-button',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  public icon = input<string | null>(null);
  public label = input<string>('');
  public type = input<MatButtonAppearance>('text');
}
