import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/models/proyecto.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectoService } from 'src/app/services/proyecto.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input('titulo') titulo?: string;

  @ViewChild('search') searchInput!: ElementRef;

  hideSearchInput = true;
  isAuthenticated!: boolean;
  proyectos!: Proyecto[];
  
  constructor(private router: Router, private auth: AuthService, private proyectoService: ProyectoService) {
    
  }

  ngOnInit(): void {
    this.auth.getStatus().subscribe(resp => this.isAuthenticated = resp);
    this.proyectoService.obtenerProyectos().subscribe(resp => this.proyectos = resp.proyectos);
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
    this.proyectoService.buscarProyecto(termino);
  }

  logout(): void {
    this.auth.logout().subscribe(resp => this.router.navigate(['/login'], {queryParams: {logout: true}}));
  }

}
