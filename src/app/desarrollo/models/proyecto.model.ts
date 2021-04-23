export interface Tarea {
  _id?: string;
  titulo: string;
  estado: string;
  descripcion: string;
  id_tarea_padre?: string;
  id_tarea_hijo?: Array<string>;
}
export interface Proyecto {
  _id?: string;
  nombre: string;
  descripcion: string;
  tareas?: Array<Tarea>;
}

export interface getProyectos {
  ok: boolean;
  proyectos: Array<Proyecto>;
}
export interface putProyecto {
  ok: boolean;
  proyecto: Proyecto;
}
