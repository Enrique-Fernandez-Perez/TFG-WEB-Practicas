import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropOptionMenu, MenuItems } from '../../../../interfaces/menu-item';
import { CommonModule } from '@angular/common';

import { SidebarDropComponent } from 'src/app/components/sidebar-drop/sidebar-drop.component';
import { SiddebarComponent } from '../../../../components/sidebar/siddebar.component';

@Component({
  standalone : true,
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ],
  imports:[
    RouterModule,
    CommonModule,
    SiddebarComponent,
    SidebarDropComponent
  ]
})
export class IndexComponent {

  menuOption : MenuItems[] = [
    {
      name : 'Usuarios registrados',
      path : '/admin/users/register'
    },

    {
      name : 'Usuarios',
      path : 'listUser'
    },

    {
      name : 'Actividades',
      path : ''
    },

    {
      name : 'Actividades Favoritas',
      path : ''
    },

    {
      name : 'Inscripto en',
      path : ''
    },

    {
      name : 'Mis actividades',
      path : ''
    },
  ];

  mesOptions : DropOptionMenu[] = [
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
