import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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

  @ViewChildren('tref') tref!: QueryList<ElementRef>;

  proyectos: Proyecto[] = [];
  cargando = true;
  mensaje!: string;

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

  voltear(id: number) {
    const cardClassList = this.tref.find(i => i.nativeElement.id == id)?.nativeElement.classList as DOMTokenList;
    if (cardClassList.contains('voltear'))
      cardClassList.remove('voltear');
    else
      cardClassList.add('voltear');
  }
}
