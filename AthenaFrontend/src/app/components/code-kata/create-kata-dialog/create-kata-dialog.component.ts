import { Component, Input } from '@angular/core';
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
import { KataService } from 'src/app/services/kata.service';
import { StudentKata } from 'src/models/studentkata.model';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-kata-dialog',
  templateUrl: './create-kata-dialog.component.html',
  styleUrls: ['./create-kata-dialog.component.css']
})
export class CreateKataDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreateKataDialogComponent>,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public moduleService: ModuleService,
    public router: Router,
    public authService: AuthService,
    public breadcrumb: BreadcrumbService,
    public kataService: KataService,
  ) {

    const pageName: string = 'code-kata';
    breadcrumb.makeCurrentPage(pageName, router.url, '');
    breadcrumb.setPrevPages();
  }

  name: string = '';
  description: string = '';

  createKata(name: string, desc: string){

    this.kataService.AddKata(desc,name).then((result: boolean) => {
      if (result) {
        this.dialogRef.close(true);
        this.refreshPage();
      }
      else {
        console.error('Failed to update daily standup.');
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
    }

    private refreshPage(): void {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
    }
  }