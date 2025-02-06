import { Component, Input } from '@angular/core';
import { Module } from 'src/models/module';
@Component({
  selector: 'app-module-dash-card',
  templateUrl: './module-dash-card.component.html',
  styleUrls: ['./module-dash-card.component.css']
})
export class ModuleDashCardComponent {
  @Input() modules: Module[]= [];
  @Input() role: any;

  constructor() {}

  public getImgLink(name: string) {
    return '../../../../assets/images/' + name.toLowerCase() + 'logo.png';
  }
}
