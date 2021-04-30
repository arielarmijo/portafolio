import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  proyectos!: Proyecto[];
  mensaje = 'No existen proyectos.';
  cargando!: boolean;

  subscripcion!: Subscription; 

  constructor(private proyectoService: ProyectoService) { }
  
  ngOnInit(): void {
    this.subscripcion = this.proyectoService.obtenerProyectos().subscribe(resp => this.cargarProyectos(resp),
                                                                          error => this.errorHandler(error));
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  private cargarProyectos(resp: any): void {
    console.log('respuesta', resp);
    this.proyectos= resp;
  }

  private errorHandler(error: any): void {
    console.log('error', error);
    this.proyectos = [];
    this.mensaje = 'Error de conexión.';
  }

}
