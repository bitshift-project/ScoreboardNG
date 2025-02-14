import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const openCloseAnimation = trigger('openClose', [
  // Transition between any two states
  transition('* <=> *', [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      { optional: true }
    ),
    group([
      query(
        ':enter',
        [
          style({ transform: 'translateY(1200px)', zIndex: 1 }),
          animate('0.3s 0.3s ease-out', style({ transform: 'translateX(0%)' })),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ transform: 'translateY(0%)', zIndex: 2 }),
          animate('0.3s ease-in', style({ transform: 'translateY(-120%)' })),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);
