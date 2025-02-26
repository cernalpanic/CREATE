import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kata } from 'src/models/kata.model';
import { ModuleService } from 'src/app/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthToken } from 'src/models/authtoken.model';
import { Student } from 'src/models/student.model';
import { Mentor } from 'src/models/mentor.model';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-code-kata',
  templateUrl: './code-kata.component.html',
  styleUrls: ['./code-kata.component.css']
})

export class CodeKataComponent {
  public kata: Kata[] = [];
  public role: any;

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public moduleService: ModuleService,
    public router: Router,
    public authService: AuthService,
    public breadcrumb: BreadcrumbService
  ) {
    this.initialize();

    const pageName: string = 'code-kata';
    breadcrumb.makeCurrentPage(pageName, router.url, '');
    breadcrumb.setPrevPages();
  }

  public async initialize() {
    const response = await this.authService.getAuthentication();
    const auth = new AuthToken(response);
    this.role = auth.Role;
    if (this.role.Name == 'Student') {
      this.role.Person = new Student(this.role.Person);
    } else if (this.role.Name == 'Mentor') {
      this.role.Person = new Mentor(this.role.Person);
    }
  }
}

/** 
import { Component } from '@angular/core';

@Component({
  selector: 'app-code-kata',
  templateUrl: './code-kata.component.html',
  styleUrls: ['./code-kata.component.css']
})
export class CodeKataComponent {

}
*/