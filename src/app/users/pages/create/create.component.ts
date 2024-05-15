import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailUser } from '../../../auth/interfacess/user';
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
  // private router = inject(Router);
  // private authStatus = inject(AuthService);

  createForm!: FormGroup;

  users : EmailUser[] = [];

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
    this.createForm = new FormGroup({
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
