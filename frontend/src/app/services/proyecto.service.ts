import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap} from 'rxjs/operators';
import { Proyecto } from '../models/proyecto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl = environment.apiURL;


  constructor(private http: HttpClient) { }

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}/proyectos`)
                    .pipe(
                      map(proyectos => this.mapProjectImages(proyectos))
                    );
  }

  obtenerProyectoPorId(id: number) {
    return this.http.get<Proyecto>(`${this.apiUrl}/proyecto/${id}`).pipe(map(proyecto => this.mapProjectImage(proyecto)));
  }

  subirFotoProyecto(file: File) {
    const formData = new FormData();
    formData.append('imagen', file);
    return this.http.post(`${this.apiUrl}/proyecto/img`, formData);
  }

  crearProyecto(proyecto: Proyecto) {
    return this.http.post<any>(`${this.apiUrl}/proyecto`, proyecto);
  }

  borrarProyecto(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/proyecto/${id}`);
  }


  private mapProjectImages(proyectos: Proyecto[]) {
    return proyectos.map(p => this.mapProjectImage(p));
  }

  private mapProjectImage(project: Proyecto) {
    project.imagen =`${this.apiUrl}/imagen/${project.imagen}`;
    return project;
  }
  
}
