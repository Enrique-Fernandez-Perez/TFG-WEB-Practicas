import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailUser } from '../../../auth/interfacess/user';
import { AuthService } from 'src/app/auth/services/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent {

  private fb = inject(FormBuilder);

  activity = ' ``1 futbol 2024´´';

  users : EmailUser[] = [];

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
      file: new FormControl('', Validators.required),
    });

   /*  this.getLog(); */
    if(!this.log){
      // this.router.navigateByUrl('login');
    }

    // TODO  usar service para recoger los usuarios
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

    const formData = new FormData();

    formData.append('titulo',form.value.titulo);
    formData.append('descripcion',form.value.descripcion);
    formData.append('destinatario',form.value.destinatario);
    formData.append('categoria_id',form.value.categoria_id);
    formData.append('file', this.selectedImage);

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
}
