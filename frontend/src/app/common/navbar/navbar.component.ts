import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input('titulo') titulo?: string;

  @ViewChild('search') searchInput!: ElementRef;

  hideSearchInput = true;
  
  constructor() { }

  ngOnInit(): void {
    
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

}
