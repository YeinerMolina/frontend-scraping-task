import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Rating } from '../../molecules/rating/rating';

@Component({
  selector: 'ui-card',
  imports: [Rating, MatTooltipModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  public imageUrl = input<string>('');
  public title = input<string>('');
  public price = input<string>('');
  public rating = input<number>(0);
  public stock = input<string>('');
  public category = input<string>('');
}
