import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit, OnDestroy {

  proyecto!: Proyecto;
  error!: string;
  subscription$!: Subscription;

  constructor(private proyectoService: ProyectoService, private activatedRouter: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.subscription$ = this.activatedRouter.params.subscribe(p => {
      this.proyectoService.obtenerProyectoPorId(p['id']).subscribe(
        proyecto => this.proyecto = proyecto,
        error => {
          console.log(error);
          this.error = `${error.status}: ${error.error.message}`;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


  goBack() {
    this.location.back();
  }

  buscar(termino: string) {
    console.log(termino);
    this.router.navigate(['/proyectos'], {queryParams: {search: termino}});
  }

}
