import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Tag } from '../../domain/Challenge';

@Component({
  selector: 'app-challenge-card',
  imports: [MatCardModule],
  templateUrl: './challenge-card.component.html',
  styleUrl: './challenge-card.component.scss'
})
export class ChallengeCardComponent {
  title = input.required<string>();
  shortDescription = input.required<string>();
  longDescription = input.required<string>();
  tags = input<Tag[]>([]);


}
