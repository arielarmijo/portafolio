import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  proyecto!: Proyecto;

  constructor(private proyectoService: ProyectoService,
              private activatedRouter: ActivatedRoute,
              private location: Location) { }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(p => {
      this.proyectoService.obtenerProyectoPorId(p['id']).subscribe(proyecto => this.proyecto = proyecto);
    });
  }

  goBack() {
    this.location.back();
  }

}
