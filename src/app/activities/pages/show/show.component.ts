import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';
import { Actividades, Img } from '../../interfaces/actividades';
import { User } from 'src/app/auth/interfacess/user';
// import { User } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css' ]
})
export class ShowComponent implements OnInit{

  id!: number;
  actividad !: Actividades;

  organizador !: User;
  imagenes : Img[] = [];
  
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public actividadService: ActividadesService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['Id'];
        
    this.actividadService.findbyId(this.id).subscribe((data: Actividades)=>{
      this.actividad = data;
      if(!data.images){
        this.imagenes = data.images;
      }
    });
  }

  delete(id : number){}

}
