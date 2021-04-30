import { Proyecto } from "./proyecto.interface";

export interface ProyectoWrapper {
    error: boolean,
    estado: string,
    proyectos: Proyecto[]
}