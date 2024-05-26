import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Actividades } from 'src/app/activities/interfaces/actividades';
import { ActividadesService } from 'src/app/activities/services/actividades.service';

@Component({
  selector: 'app-my-index',
  templateUrl: './my-index.component.html',
  styles: [
  ],
  standalone : true,
  imports : [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class MyIndexComponent {


  actividades : Actividades[] = [
    /* {
      id : 0,
      titulo : 'string',
      descripcion : 'string',
      organizador : {id: 0, email: '0'},
      files : [{id:0, name:'0', file_path:'0'}],
      images : [
        {
          id:0,
          name:'0',
          descripcion:'0',
          file_path:'https://observatoriotecedu.uned.ac.cr/media/sun.jpg'
        },

        {
          id:1,
          name:'1',
          descripcion:'1',
          file_path:'https://live.staticflickr.com/1008/1065578536_46ce38958c_b.jpg'
        },
      ],
    },

    {
      id : 1,
      titulo : '1',
      descripcion : '1',
      organizador : {id: 1, email: '1'},
      files : [{id:1, name:'1', file_path:'1'}],
      images : [
        {
          id:2,
          name:'2',
          descripcion:'2',
          file_path:'https://live.staticflickr.com/7297/13964266784_1148ef0b39_b.jpg'
        },

        {
          id:3,
          name:'3',
          descripcion:'3',
          file_path:'https://www.blogdelfotografo.com/wp-content/uploads/2017/01/cascade-1853341_1920.jpg'
        },
      ],
    },

    {
      id : 0,
      titulo : 'string',
      descripcion : 'string',
      organizador : {id: 0, email: '0'},
      files : [{id:0, name:'0', file_path:'0'}],
      images : [
        {
          id:0,
          name:'0',
          descripcion:'0',
          file_path:'https://observatoriotecedu.uned.ac.cr/media/sun.jpg'
        },

        {
          id:1,
          name:'1',
          descripcion:'1',
          file_path:'https://live.staticflickr.com/1008/1065578536_46ce38958c_b.jpg'
        },
      ],
    }, */
  ];

  private actividadesService = inject(ActividadesService);

  //  TODO usar servicio actividades para traer las actividades
  ngOnInit(){
    this.actividadesService.getAll().subscribe(data =>{
        this.actividades = data;
        console.log(data);
      });
    }
}
