import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailUser, User } from '../../../auth/interfacess/user';
import { UsersService } from '../../services/users.service';
import { ActividadesService } from 'src/app/activities/services/actividades.service';
import { Actividades, postActividades } from 'src/app/activities/interfaces/actividades';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
// import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [
  ]
})
export class CreateComponent {

  private fb = inject(FormBuilder);

  // public peticionService = inject(PeticionService)
  private router = inject(Router);
  private userService = inject(UsersService);
  private activiadService = inject(ActividadesService);
  private authStatus = inject(AuthService);

  createForm!: FormGroup;

  // users : EmailUser[] = [];
  users : User[] = [];

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
    this.loadUsers();
    this.createForm = new FormGroup({
      titulo: new FormControl('lol', [Validators.required]),
      descripcion: new FormControl('pol', Validators.required),
      organizador: new FormControl(1, [Validators.required]),
      fecha: new FormControl(new Date(), Validators.required),
      // file: new FormControl('', Validators.required),
    });

   /*  this.getLog(); */
    if(!this.log){
      // this.router.navigateByUrl('login');
    }
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
    return this.createForm.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(form : FormGroup){

    const formData = new FormData();

    // formData.append('titulo',form.value.titulo);
    // formData.append('descripcion',form.value.descripcion);
    // formData.append('destinatario',form.value.destinatario);
    // formData.append('categoria_id',form.value.categoria_id);
    // formData.append('file', this.selectedImage);

    let FFech = form.value.fecha
    let sendFecha = '';
    sendFecha = FFech[FFech.length-10] + FFech[FFech.length-9] + FFech[FFech.length-8] + FFech[FFech.length-7];
    sendFecha += FFech[FFech.length-6];
    sendFecha += FFech[FFech.length-5] + FFech[FFech.length-4];
    sendFecha += FFech[FFech.length-3];
    sendFecha += FFech[FFech.length-2] + FFech[FFech.length-1];

    formData.append('titulo',form.value.titulo);
    formData.append('descripcion',form.value.descripcion);
    formData.append('organizador',form.value.organizador);
    // formData.append('fecha', form.value.fecha);
    formData.append('fecha', sendFecha);
    // formData.append('file', this.selectedImage);


    let actividad : postActividades = {
      titulo : form.value.titulo,
      descripcion : form.value.descripcion,
      organizador : form.value.organizador,
      fecha : sendFecha,
    }


    // this.activiadService.add(formData).subscribe((result)=>{console.log(result);});
    this.activiadService.add(actividad).subscribe((result)=>{
      this.router.navigate(['/admin']);
    });


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
}
