import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const loginButtonRotation = trigger('loginButtonRotation', [
  state('false', style({ transform: 'rotate(0)' })),
  state('true', style({ transform: 'rotate(-180deg)', color :'rgb(168, 66, 67)'})),
  transition('false <=> true', animate('500ms ease-out')),
]);
