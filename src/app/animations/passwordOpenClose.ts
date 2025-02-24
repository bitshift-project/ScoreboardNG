import { animate, style, transition, trigger } from '@angular/animations';

export const passwordOpenClose = trigger('passwordOpenClose', [
  transition(':enter', [
    style({ transform: 'translateY(-100px) translateX(100px)' }),
    animate('0.3s ease-out', style({ transform: 'translateY(0%)' })),
  ]),
  transition(':leave', [
    animate(
      '0.3s ease-out',
      style({ transform: 'translateY(-100px) translateX(100px)' })
    ),
  ]),
]);
