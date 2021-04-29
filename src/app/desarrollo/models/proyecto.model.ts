export interface Tarea {
  _id?: string;
  titulo: string;
  estado: string;
  lineaBase: number;
  version: number;
  descripcion: string;
  id_tarea_padre?: string;
  id_tarea_hijo?: Array<string>;
}
export interface LineaBase {
  lineaBase: number;
  descripcion: string;
  abierto: boolean;
  tareas: Array<Tarea>;
}
export interface Proyecto {
  _id?: string;
  nombre: string;
  descripcion: string;
  tareas?: Array<Tarea>;
  lineasBase?: Array<LineaBase>;
}

export interface getProyectos {
  ok: boolean;
  proyectos: Array<Proyecto>;
}
export interface putProyecto {
  ok: boolean;
  proyecto: Proyecto;
}
