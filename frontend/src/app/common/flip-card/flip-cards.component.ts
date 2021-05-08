import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { Proyecto } from 'src/app/models/proyecto.interface';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.css']
})
export class FlipCardComponent implements OnInit {

  @ViewChildren('tref') tref!: QueryList<ElementRef>;

  @Input() proyecto!: Proyecto;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  voltear(id: number) {
    const cardClassList = this.tref.find(i => i.nativeElement.id == id)?.nativeElement.classList as DOMTokenList;
    if (cardClassList.contains('voltear'))
      cardClassList.remove('voltear');
    else
      cardClassList.add('voltear');
  }

}
