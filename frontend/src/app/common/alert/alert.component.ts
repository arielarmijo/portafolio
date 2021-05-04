import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() mensaje!: string;
  @Input() mostrar!: boolean;
  @Input() tipo!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
