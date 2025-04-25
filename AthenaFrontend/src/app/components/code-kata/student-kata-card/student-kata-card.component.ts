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
import { EditStudentKataComponent } from '../edit-student-kata/edit-student-kata.component';

@Component({
  selector: 'app-student-kata-card',
  templateUrl: './student-kata-card.component.html',
  styleUrls: ['./student-kata-card.component.css']
})
export class StudentKataCardComponent {

  @Input() kata: any;

  @Input() studentKata: any;

  @Input() role: any;

  constructor(
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

  getCompleteStatus(sk: StudentKata | undefined) { // Determines whether or not the student has completed the kata
    if (!sk) {
      return false;
    } else {
      return sk.Complete;
    }
  }
   createStudentKata(sk: StudentKata | undefined, k: Kata){
     if(!sk){
       this.kataService.AddStudentKata(this.role.RoleID, k.KataID);
     }
  }


  editStudentKata(sk: StudentKata, kata: Kata) {
    this.dialog.open(EditStudentKataComponent, {
      panelClass: 'kata-dialog',
      data: { studentKata: sk, kata: kata },
    })
  }

}
