import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  mensaje = 'No hay proyectos.';

  private destroy$ = new Subject<void>();

  constructor(private ps: ProyectoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.ps.buscarProyectos(params.get('search')).pipe(takeUntil(this.destroy$)).subscribe(resp => {
        this.proyectos = resp;
        this.cargando = false;
      },
        error => {
          this.cargando = false;
          this.mensaje = error.statusText;
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
