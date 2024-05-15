import { Component, Input } from '@angular/core';
import { Img } from '../../activities/interfaces/actividades';

@Component({
  selector: 'app-carousel',
  templateUrl: './carrousel.component.html',
  styles: [
  ]
})
export class CarrouselComponent {

  @Input()
  images : Img[] = [];

  @Input()
  visibleBtn : boolean = false;
}
