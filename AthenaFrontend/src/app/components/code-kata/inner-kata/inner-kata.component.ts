import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { KataService } from 'src/app/services/kata.service';
import { Kata } from 'src/models/kata.model';

@Component({
  selector: 'app-inner-kata',
  templateUrl: './inner-kata.component.html',
  styleUrls: ['./inner-kata.component.css']
})
export class InnerKataComponent {
  public kata: Kata;

  constructor(private router: Router, public kataService: KataService, public breadcrumb: BreadcrumbService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      kata: Kata;
    };
    this.kata = state.kata;
    const pageName: string = this.kata.KataName;
    breadcrumb.makeCurrentPage(pageName, router.url, state);
    breadcrumb.setPrevPages();
  }

  public async ngOnInit() {

  }
}
