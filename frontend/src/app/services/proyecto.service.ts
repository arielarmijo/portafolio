import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap} from 'rxjs/operators';
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
                      map(proyectos => {
                        proyectos.map(proyecto => {
                          proyecto.imagen = `${this.apiUrl}/proyecto/img/${proyecto.id}`;
                        });
                        return proyectos;
                      }),
                      tap(() => {
                        console.log(this.apiUrl);
                      }));
  }

  obtenerProyectoPorId(id: number) {
    return this.http.get<Proyecto>(`${this.apiUrl}/proyecto/${id}`)
                    .pipe(
                      map(proyecto => {
                        proyecto.imagen = `${this.apiUrl}/proyecto/img/${proyecto.id}`;
                        return proyecto;
                      }));
  }
  
}
