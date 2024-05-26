import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfacess/user';
import { UsersService } from 'src/app/users/services/users.service';

@Component({
  selector: 'admin-users-list',
  templateUrl: './list-users.component.html',
  styles: [
  ]
})
export class ListUsersComponent {

  roles : string[] = ['registrado', 'alumno', 'profesor', 'administrador'];

  private usersService = inject(UsersService);
  private router = inject(Router);

  users : User[] = [];
  errors: any = null;

  public fb = inject(FormBuilder);
  editUsersForm : FormGroup = this.fb.group({
    // name : '',
    // email : '',
    role_id : 'registrado'
  });

  ngOnInit(){
    this.listUsers();
  }

  update(user : User){
    user.role_id = this.editUsersForm.value.role_id;

    this.usersService.update(user).subscribe(
      (result) => {
        console.log(result);
      },
      (error) => {
        this.errors = error.error;
      },
      () => {
        // this.router.navigate(['/admin']);
        this.listUsers();
      }
    );
  }

  listUsers(){
    this.users = [];
    this.usersService.getRegisters().subscribe(data =>{
      this.users = data;
    });
  }

  delete(id : number){
    this.usersService.delete(id).subscribe(data =>{
        this.listUsers();
      }
    );
  }
}
