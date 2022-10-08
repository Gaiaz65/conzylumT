import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-star-rating',
  template: ` <ngb-rating
    class="star"
    [rate]="rating"
    #tooltip="matTooltip"
    matTooltip="{{ rating + '/5' }}"
  ></ngb-rating>`,
  styles: [
    `
      .star {
        font-size: 1rem;
        color: #673ab7;
      }
    `,
  ],
})
export class StarComponent {
  @Input() rating: any;
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
}
