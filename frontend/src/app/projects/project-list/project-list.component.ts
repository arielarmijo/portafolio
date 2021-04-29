import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  proyectos?: Proyecto[];
  cargando = true;

  constructor(private proyectoService: ProyectoService) {
    
  }

  ngOnInit(): void {
    this.proyectoService.obtenerProyectos().subscribe(resp => {
      this.proyectos = resp;
      this.cargando = false;
    });
  }

}
