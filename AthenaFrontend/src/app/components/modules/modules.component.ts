import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModuleDialog } from './add-module-dialog/add-module-dialog';
import { Module } from 'src/models/module';
import { ModuleService } from 'src/app/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthToken } from 'src/models/authtoken.model';
import { Student } from 'src/models/student.model';
import { Mentor } from 'src/models/mentor.model';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.css'],
})
export class ModulesComponent {
  public modules: Module[] = [];
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

    const pageName: string = 'modules';
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
    this.getAllModules();
  }

  public addModule(): void {
    const dialogRef = this.dialog.open(AddModuleDialog, {
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        let module = new Module(response);
        this.modules.push(module);
        this.snackbar.open('Module successfully added!', '', {
          duration: 3000,
        });
      }
    });
  }

  public async getAllModules(): Promise<void> {
    this.modules = [];
    const response = await this.moduleService.GetAllModules();
    for (let mod of response) {
      let module = new Module(mod);
      this.modules.push(module);
    }
  }
}
