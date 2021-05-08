import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input('titulo') titulo?: string;

  @ViewChild('search') searchInput!: ElementRef;

  hideSearchInput = true;
  isAuthenticated!: boolean;
  proyectos!: Proyecto[];
  private destroy$ = new Subject<void>();
  
  constructor(private router: Router, private auth: AuthService, private proyectoService: ProyectoService) { }

  ngOnInit(): void {
    this.auth.getStatus().pipe(takeUntil(this.destroy$)).subscribe(resp => this.isAuthenticated = resp);
    this.proyectoService.obtenerProyectos().pipe(takeUntil(this.destroy$)).subscribe(resp => this.proyectos = resp);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSearch(): void {
    this.hideSearchInput = !this.hideSearchInput;
  }

  hideSearch(): void {
    setTimeout(() => {
      this.hideSearchInput=true;
    }, 1000);
  }

  buscar(termino: string) {
    this.router.navigate(['/proyectos'], {queryParams: {search: termino}});
  }

  logout(): void {
    this.auth.logout().pipe(takeUntil(this.destroy$)).subscribe(resp => this.router.navigate(['/login'], {queryParams: {logout: true}}));
  }

}
