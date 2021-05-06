import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { Proyecto } from '../models/proyecto.interface';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl = `${environment.apiURL}/api`;
  private proyectosSub$ = new BehaviorSubject<Proyecto[]>([]);
  private proyectos$ = this.proyectosSub$.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) { }

  obtenerProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${this.apiUrl}/proyectos`)
      .pipe(
        map(proyectos => this.mapProjectImages(proyectos)),
        tap(proyectos => this.proyectosSub$.next(proyectos)),
        concatMap(proyectos => this.proyectos$));
  }

  obtenerProyectoPorId(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}/proyecto/${id}`).pipe(map(proyecto => this.mapProjectImage(proyecto)));
  }

  subirFotoProyecto(file: File) {
    const formData = new FormData();
    formData.append('imagen', file);
    return this.http.post(`${this.apiUrl}/proyecto/img`, formData, {headers: this.authorizationHeader()});
  }

  crearProyecto(proyecto: Proyecto) {
    return this.http.post<any>(`${this.apiUrl}/proyecto`, proyecto, {headers: this.authorizationHeader()});
  }

  actualizarProyecto(proyecto: Proyecto) {
    return this.http.put<any>(`${this.apiUrl}/proyecto/${proyecto.id}`, proyecto, {headers: this.authorizationHeader()});
  }

  borrarProyecto(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/proyecto/${id}`, {headers: this.authorizationHeader()});
  }

  buscarProyecto(termino: string) {
    this.http.get<Proyecto[]>(`${this.apiUrl}/proyectos/buscar`, {params: {termino: termino}})
      .pipe(map(proyectos => this.mapProjectImages(proyectos)))
      .subscribe(proyectos => this.proyectosSub$.next(proyectos));
  }

  obtenerEtiquetas() {
    return this.http.get<any[]>(`${this.apiUrl}/etiquetas`);
  }

  private mapProjectImages(proyectos: Proyecto[]) {
    return proyectos.map(p => this.mapProjectImage(p));
  }

  private mapProjectImage(project: Proyecto) {
    project.urlImagen =`${this.apiUrl}/imagen/${project.imagen}`;
    return project;
  }

  private authorizationHeader() {
    const credentials = this.auth.getCredentials()
    return new HttpHeaders({ authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
  }
  
}
