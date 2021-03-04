export interface GetUsuarios {
  ok: Boolean;
  usuarios: Array<UsuarioBD>;
}
export interface UsuarioBD {
  estado: Boolean;
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  role: string;
  img:string
}
export interface NewUsuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  role: string;
  img:string
}
