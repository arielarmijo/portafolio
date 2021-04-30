import { Etiqueta } from "./etiqueta";

export interface Proyecto {
    id?: number;
    nombre: string;
    descripcionCorta: string;
    descripcionLarga?: string;
    urlProyecto: string;
    urlRepositorio: string;
    imagen?: string;
    creadoEn?: Date;
    etiquetas?: Etiqueta[];
}
