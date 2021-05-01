import { Etiqueta } from "./etiqueta.interface";

export interface Proyecto {
    id: number;
    nombre: string;
    descripcionCorta: string;
    descripcionLarga?: string;
    urlProyecto: string;
    urlRepositorio: string;
    imagen?: string;
    urlImagen?: string;
    creadoEn?: Date;
    etiquetas?: Etiqueta[];
}
