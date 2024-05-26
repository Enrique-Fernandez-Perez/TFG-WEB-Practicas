import { EmailUser, User } from "../../auth/interfacess/user";

export interface Actividades {
  id : number;
  titulo : string;
  descripcion : string;
  organizador : EmailUser;
  fecha : Date,
  files : Files[];
  images : Img[];
}

export interface postActividades {
  titulo : string;
  descripcion : string;
  organizador : EmailUser;
  fecha : Date|string,
  files ?: Files[];
}

export interface editActividades {
  id : number;
  titulo : string;
  descripcion : string;
  organizador : EmailUser;
  fecha : Date|string,
  files ?: Files[];
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

