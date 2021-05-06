import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProyectoWrapper } from 'src/app/models/proyecto-wrapper.interface';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-project-list',
  templateUrl: './admin-project-list.component.html',
  styleUrls: ['./admin-project-list.component.css']
})
export class AdminProjectListComponent implements OnInit, OnDestroy {

  proyectos: Proyecto[] = [];
  cargando = true;
  mensaje = 'No hay proyectos.';

  subscripcion!: Subscription;

  constructor(private ps: ProyectoService) { }

  ngOnInit(): void {
    this.subscripcion = this.ps.obtenerProyectos().subscribe(resp => {
      this.proyectos = resp;
      this.cargando = false;
    },
    error => {
      this.cargando = false;
      this.mensaje = error.statusText;
    });
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
        this.ps.borrarProyecto(proyecto.id as number).subscribe(
          resp => {
            this.ps.obtenerProyectos().subscribe(resp => this.proyectos = resp);
          },
          error => {
            Swal.fire({
              title: 'Error',
              text: error.error.message,
              icon: 'error'
            });
          });
      }
    });
  }

  private cargarProyectos(resp: ProyectoWrapper): void {
    console.log('test', resp);

    this.proyectos = resp.proyectos;
    this.mensaje = resp.estado;
    //this.cargando = tr;
  }

}
