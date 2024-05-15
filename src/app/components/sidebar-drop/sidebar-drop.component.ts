import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropOptionMenu, MenuItems } from '../../interfaces/menu-item';

@Component({
  selector: 'app-sidebar-drop',
  templateUrl: './sidebar-drop.component.html',
  styles: [
  ],
  standalone : true,
  imports:[
    RouterModule,
    CommonModule,
  ]
})
export class SidebarDropComponent {

  //year
  @Input()
  menuOption : DropOptionMenu[] = [];

  @Input()
  title : string = '';
}
