import { UsuarioBD } from 'src/app/administracion/models/usuario';

export interface login {
  ok: Boolean;
  token: string;
  usuario: UsuarioBD;
}

