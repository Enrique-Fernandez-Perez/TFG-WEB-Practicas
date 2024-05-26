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
      path : '/admin/users/listUser'
    },

    {
      name : 'Actividades',
      path : '/admin/activities'
    },

    {
      name : 'Actividades Favoritas',
      path : '/admin/activities/favoritas'
    },

    {
      name : 'Inscripto en',
      path : '/admin/activities/inscritas'
    },

    {
      name : 'Mis actividades',
      path : '/admin/activities/mine'
    },

    {
      name : 'Crear actividad',
      path : '/admin/activities/create'
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
