import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, concat, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, concatMap, delay, map, retryWhen, take, tap} from 'rxjs/operators';
import { Proyecto } from '../models/proyecto.interface';
import { environment } from 'src/environments/environment';
import { ProyectoWrapper } from '../models/proyecto-wrapper.interface';
import { AuthService } from './auth.service';
import { Credentials } from '../models/credentials.interface';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private apiUrl = environment.apiURL + '/api';
  private proyectosSub$ = new Subject<ProyectoWrapper>();
  private proyectos$ = this.proyectosSub$.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) { }

  obtenerProyectos(): Observable<ProyectoWrapper> {
    this.http.get<Proyecto[]>(`${this.apiUrl}/proyectos`)
             .pipe(
               map(proyectos => this.mapProjectImages(proyectos))
             ).subscribe(proyectos => this.cargarProyectos(proyectos)
             );
    return this.proyectos$;
  }

  obtenerProyectoPorId(id: number): Observable<Proyecto> {
    return this.http.get<Proyecto>(`${this.apiUrl}/proyecto/${id}`).pipe(map(proyecto => this.mapProjectImage(proyecto)));
  }

  subirFotoProyecto(file: File) {
    const formData = new FormData();
    formData.append('imagen', file);
    return this.http.post(`${this.apiUrl}/proyecto/img`, formData, {headers: this.authorizationHeader(this.auth.getCredentials())});
  }

  crearProyecto(proyecto: Proyecto) {
    return this.http.post<any>(`${this.apiUrl}/proyecto`, proyecto, {headers: this.authorizationHeader(this.auth.getCredentials())});
  }

  actualizarProyecto(proyecto: Proyecto) {
    return this.http.put<any>(`${this.apiUrl}/proyecto/${proyecto.id}`, proyecto, {headers: this.authorizationHeader(this.auth.getCredentials())});
  }

  borrarProyecto(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/proyecto/${id}`, {headers: this.authorizationHeader(this.auth.getCredentials())});
  }

  private cargarProyectos(proyectos: Proyecto[]): void {
    const projectoWrapper = {
      error: false,
      estado: proyectos.length == 0 ? 'No hay proyectos.' : 'Proyectos cargados.',
      proyectos: proyectos
    };
    this.proyectosSub$.next(projectoWrapper);
  }

  private errorHandler(error: any): void {
    const proyectoWrapper = {
      error: true,
      estado: 'Error de conexión.',
      proyectos: []
    };
    this.proyectosSub$.next(proyectoWrapper);
    console.log('Error: ' + error);
  }

  private mapProjectImages(proyectos: Proyecto[]) {
    return proyectos.map(p => this.mapProjectImage(p));
  }

  private mapProjectImage(project: Proyecto) {
    project.urlImagen =`${this.apiUrl}/imagen/${project.imagen}`;
    return project;
  }

  private authorizationHeader(credentials: Credentials) {
    return new HttpHeaders({ authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password) });
  }
  
}
