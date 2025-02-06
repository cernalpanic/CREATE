import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Module } from 'src/models/module';
@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.css']
})
export class ModuleCardComponent {
  @Input() modules: Module[]= [];
  @Input() role: any;

  constructor(private authService: AuthService) {

  }

  public getImgLink(name: string) {
    return '../../../../assets/images/' + name.toLowerCase() + 'logo.png';
  }
}
