import { animate, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('0.3s ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [animate('0.3s ease-in', style({ opacity: 0 }))]),
]);
