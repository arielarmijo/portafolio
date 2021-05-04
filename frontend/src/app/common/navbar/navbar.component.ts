import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getStatus().subscribe(resp => this.isAuthenticated = resp);
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
    console.log(termino);
  }

  logout(): void {
    this.auth.logout().subscribe(resp => this.router.navigate(['/login'], {queryParams: {logout: true}}));
  }

}
