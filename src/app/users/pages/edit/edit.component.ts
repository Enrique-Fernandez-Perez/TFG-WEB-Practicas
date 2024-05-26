import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailUser, User } from '../../../auth/interfacess/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ActividadesService } from 'src/app/activities/services/actividades.service';
import { Actividades, editActividades } from 'src/app/activities/interfaces/actividades';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent {

  private fb = inject(FormBuilder);

  activity !: Actividades;

  users : User[] = [];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private userService = inject(UsersService);
  private activiadService = inject(ActividadesService);
  private authStatus = inject(AuthService);


  // public peticionService = inject(PeticionService)
  // private router = inject(Router);
  // private authStatus = inject(AuthService);

  editForm !: FormGroup;

  imageSrc : string ='';
  selectedImage!: any;

  log ?: any;

  // categorias ?: Categoria[];
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor( ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.editForm = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', Validators.required),
      organizador: new FormControl('', [Validators.required]),
      fecha: new FormControl(new Date(), Validators.required),
      // file: new FormControl('', Validators.required),
    });
    this.loadUsers();
    this.loadActivitie();

   /*  this.getLog(); */
    if(!this.log){
      // this.router.navigateByUrl('login');
    }

    // TODO  usar service para recoger los usuarios
  }

  loadForm(item : Actividades){
    this.editForm = new FormGroup({
      titulo: new FormControl(item.titulo, [Validators.required]),
      descripcion: new FormControl(item.descripcion, Validators.required),
      organizador: new FormControl(item.organizador, [Validators.required]),
      fecha: new FormControl(new Date(item.fecha), Validators.required),
      // file: new FormControl('', Validators.required),
    });

  }

  /* getLog() {
    this.authStatus.userAuthState.subscribe(data => this.log = data);
  } */

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.editForm.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(form : FormGroup){
    let FFech = form.value.fecha
    let sendFecha = '';
    sendFecha = FFech[FFech.length-10] + FFech[FFech.length-9] + FFech[FFech.length-8] + FFech[FFech.length-7];
    sendFecha += FFech[FFech.length-6];
    sendFecha += FFech[FFech.length-5] + FFech[FFech.length-4];
    sendFecha += FFech[FFech.length-3];
    sendFecha += FFech[FFech.length-2] + FFech[FFech.length-1];

    let actividad : editActividades = {
      id : this.activity.id,
      titulo : form.value.titulo,
      descripcion : form.value.descripcion,
      organizador : form.value.organizador,
      fecha : sendFecha,
    }

    this.activiadService.edit(actividad).subscribe((result)=>{
      this.router.navigate(['/admin']);
      // console.log(result);
    });

    // const formData = new FormData();

    // formData.append('titulo',form.value.titulo);
    // formData.append('descripcion',form.value.descripcion);
    // formData.append('destinatario',form.value.destinatario);
    // formData.append('categoria_id',form.value.categoria_id);
    // formData.append('file', this.selectedImage);

    // console.log(formData);

    /* this.peticionService.create(formData).subscribe((res:any) => {
      this.router.navigateByUrl('peticiones/mine');
    }) */

    // this.peticionService.create(this.form.value).subscribe((res:any) => {
    //      this.router.navigateByUrl('');
    // })
  }

  onSelectFile(event : any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.selectedImage = file;
    }
  }

  loadUsers(){
    this.userService.getAll().subscribe(data => {this.users = data});
  }

  loadActivitie(){
    let id = this.route.snapshot.params['{id}'];
    this.activiadService.findbyId(id).subscribe(data => {
      this.activity = data;
      this.loadForm(data);
    });
    // console.log(this.activity);
  }
}
