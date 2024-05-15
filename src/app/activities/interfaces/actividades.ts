import { EmailUser, User } from "../../auth/interfacess/user";

export interface Actividades {
  id : number;
  titulo : string;
  descripcion : string;
  organizador : EmailUser;
  files : Files[];
  images : Img[];
}

export interface Files {
  id : number;
  name : string;
  file_path : string;
}

export interface Img {
  id : number;
  name : string;
  descripcion : string;
  file_path : string;
}

