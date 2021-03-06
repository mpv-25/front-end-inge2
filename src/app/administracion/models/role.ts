export interface RoleBD {
  _id: string;
  nombre: string;
  descripcion: string;
  permisos: Array<string>;
}

export interface GetRole {
  ok: Boolean;
  role: RoleBD;
}

export interface GetRoles {
  ok: Boolean;
  roles: Array<RoleBD>;
}
export interface NewRole {
  nombre: string;
  descripcion: string;
  permisos: Array<string>;
}
