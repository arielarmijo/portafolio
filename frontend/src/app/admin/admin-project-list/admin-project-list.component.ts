import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-project-list',
  templateUrl: './admin-project-list.component.html',
  styleUrls: ['./admin-project-list.component.css']
})
export class AdminProjectListComponent implements OnInit, OnDestroy {

  proyectos: Proyecto[] = [];
  mensaje = 'No existen proyectos.';
  cargando!: boolean;

  subscripcion!: Subscription;

  constructor(private ps: ProyectoService) { }

  ngOnInit(): void {
    this.subscripcion = this.ps.obtenerProyectos().subscribe(resp => this.cargarProyectos(resp),
                                                             error => this.errorHandler(error));
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  borrarProyecto(proyecto: Proyecto) {
    Swal.fire({
      title: 'Advertencia',
      text: `¿Seguro que quieres borrar el proyecto ${proyecto.nombre}?`,
      showCancelButton: true,
      focusCancel: true,
      icon: "warning"
    }).then(result => {
      if (result.isConfirmed) {
        this.ps.borrarProyecto(proyecto.id as number).subscribe(resp => {
          console.log(resp);
          this.ps.obtenerProyectos().subscribe(proyectos => this.proyectos = proyectos);
        });
      }
    });
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
