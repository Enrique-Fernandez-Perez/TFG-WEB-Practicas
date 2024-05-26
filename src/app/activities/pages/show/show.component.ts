import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadesService } from '../../services/actividades.service';
import { Actividades, Img } from '../../interfaces/actividades';
import { User } from 'src/app/auth/interfacess/user';
import { UsersService } from 'src/app/users/services/users.service';
// import { User } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css' ]
})
export class ShowComponent implements OnInit{

  id!: number;
  // userId!: number;
  actividad !: Actividades;

  organizador !: User;
  imagenes : Img[] = [];

  user !: User;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private activiadService = inject(ActividadesService);

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public actividadService: ActividadesService,
   ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['{id}'];

    this.loadActivitie();

    // console.log(this.userId);
    // console.log(this.actividad);
    // this.loadUser(this.actividad.organizador.id);

    // this.actividadService.findbyId(this.id).subscribe((data: Actividades)=>{
    //   this.actividad = data;
    //   if(!data.images){
    //     this.imagenes = data.images;
    //   }
    // });
  }

  delete(){
    this.activiadService.delete(this.id).subscribe(
      (result)=>{
        this.router.navigate(['admin']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  incripbirse(){
    this.activiadService.addRegistro(this.id).subscribe(
      (result)=>{
        this.router.navigate(['admin']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  addFavorita(){
    this.activiadService.addFavoritas(this.id).subscribe(
      (result)=>{
        this.router.navigate(['admin']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  loadUser(organizador : number){
    // this.userService.findbyId(item).subscribe(data => {this.user = data; console.log(data)});
    this.userService.getAll().subscribe(data => {
      data.forEach(item => {
        if(item.id != organizador){
          this.user = item;
          // console.log(item)
        }
    })
    });
  }

  loadActivitie(){
    this.activiadService.findbyId(this.id).subscribe(data => {
      this.actividad = data;
      // console.log(data);
      // this.userId = data.organizador.id;
      this.loadUser(Number(data.organizador.id));
    });
  }
}
