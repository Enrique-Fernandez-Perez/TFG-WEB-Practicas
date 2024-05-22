import { Component, inject } from '@angular/core';
import { DropOptionMenu, MenuItems } from '../../../interfaces/menu-item';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ]
})
export class IndexComponent {

  menuOption : DropOptionMenu[] = [
    {
      year : '2024',
      actividades : [
        {
          name : 'Futbol San Ignacio',
          path : 'ignacio'
        }
      ]
    },
    {
      year : '2025',
      actividades : [
        {
          name : 'Futbol',
          path : 'ignacio'
        },

        {
          name : 'Baloncesto 25',
          path : '../user'
        },
      ]
    }
  ];

}
