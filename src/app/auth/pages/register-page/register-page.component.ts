import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
// import { cantBeStrider } from 'src/app/shared/validators/validators';
// import * as customValidators from '../../../shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent{

  myForm : FormGroup = this.fb.group({
    // name:['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    // email:['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    // username:['', [Validators.required, customValidators.cantBeStrider]],
    name:['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    // email:['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidator()]],
    email:['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]],
    username:['', [Validators.required, this.validatorService.cantBeStrider]],
    password:['', [Validators.required, Validators.minLength(6)]],
    password2:['', [Validators.required]],
  },
  {
    validators:[
      this.validatorService.isFieldOneEqualsFieldTwo('password','password2'),
    ]
  });

  constructor(private fb : FormBuilder,
    private validatorService : ValidatorsService,
    private emailValidator : EmailValidator){}

  isValidField(field:string){
    return this.validatorService.isValidField(this.myForm, field);
  }

  onSubmit(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
  }
}
