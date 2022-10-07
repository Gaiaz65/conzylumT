import { Input } from '@angular/core';
import { Component } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loading-spinner',
  template: `<div #loading class="background">
    <mat-spinner></mat-spinner>
    <h2>Loading is in progress</h2>
  </div> `,
  styles: [
    `
      .background {
        min-width: 100vw;
        min-height: 100vh;
        background-color: black;
        opacity: 0.7;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap:1rem;
      }
      h2 {
        color: white
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  @Input() rating: any;
  constructor(config: NgbRatingConfig) {
    config.max = 5;
    config.readonly = true;
  }
}
