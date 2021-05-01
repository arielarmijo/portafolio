import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProyectoWrapper } from 'src/app/models/proyecto-wrapper.interface';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  proyectos: Proyecto[] = [];
  cargando = true;
  mensaje!: string;
  flip = false;

  subscripcion!: Subscription; 

  constructor(private ps: ProyectoService) { }
  
  ngOnInit(): void {
    this.subscripcion = this.ps.obtenerProyectos().subscribe(resp => this.cargarProyectos(resp));
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  private cargarProyectos(resp: ProyectoWrapper): void {
    this.proyectos= resp.proyectos;
    this.mensaje = resp.estado;
    this.cargando = false;
  }

  voltear() {
    this.flip = !this.flip;
  }

}
