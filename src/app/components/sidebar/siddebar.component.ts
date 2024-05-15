import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItems } from 'src/app/interfaces/menu-item';

@Component({
  selector: 'app-siddebar',
  templateUrl: './siddebar.component.html',
  styles: [
  ],
  standalone : true,
  imports:[
    RouterModule,
    CommonModule,
  ]
})
export class SiddebarComponent {

  @Input()
  menuOption : MenuItems[] = [];

}
