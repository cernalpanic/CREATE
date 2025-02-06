import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Module } from 'src/models/module';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent {

  public prevPages: any[] = [];
  @Input() currentPage: any;
  @Input() modules: Module[] = [];

  constructor(
    public breadcrumb: BreadcrumbService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.prevPages = breadcrumb.getPrevPages();
  }

  public getRouterLink(page: any): any {
    if (page.url.includes('/modules/')){
      const id = page.url.slice(9);
      return ['/modules/', id];
    } else {
      return [page.url];
    }
  }
}
