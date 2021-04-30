import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-project-list',
  templateUrl: './admin-project-list.component.html',
  styleUrls: ['./admin-project-list.component.css']
})
export class AdminProjectListComponent implements OnInit {

  proyectos!: Proyecto[];

  constructor(private ps: ProyectoService) { }

  ngOnInit(): void {
    this.ps.obtenerProyectos().subscribe(proyectos => this.proyectos = proyectos);
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

}
