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
  img: string;
}
export interface NewUsuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  role: string;
  img: string;
}
export interface UpdateUsuario {
  nombre: string;
  apellido: string;
  email: string;
  role: string;
  img: string;
}
export interface RespUpdateUsuario {
  ok: Boolean;
  message: string;
  usuario: UsuarioBD;
}
export interface ActualizarRole {
  role: string;
}
export interface CantidadPorRole {
  nombre: string;
  cantidad: number;
}
export interface GetCantidadUsuarioPorRole {
  ok: Boolean;
  cantidadPorRole: Array<CantidadPorRole>;
}
