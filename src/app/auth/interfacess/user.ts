export interface EmailUser{
  id: number;
  email: string;
}


export interface User {
  // id: number;
  // user: string;
  // email: string;
  // role_id : number;
    id ?: number;
    name : String;
    email : String;
    password : String;
    password_confirmation : String;
    role_id : string;
}
