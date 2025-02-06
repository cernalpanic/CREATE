import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentDialog } from './add-student-dialog/add-student-dialog';
import { Role } from 'src/models/role.model';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthToken } from 'src/models/authtoken.model';
import { MentorService } from 'src/app/services/mentor.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.css']
})
export class StudentsPageComponent {
  public allStudents: Role[] = [];
  public myStudents: Role[] = [];
  public mentor: Role;
  public auth: AuthToken;

  constructor(
    public dialog: MatDialog,
    public studentService: StudentService,
    public mentorService: MentorService,
    public snackbar: MatSnackBar,
    public router: Router,
    public breadcrumb: BreadcrumbService
  ) {
    this.getAllStudents();
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      auth: AuthToken,
      expectedRole: string
    };
    this.auth = state.auth;
    this.mentor = state.auth.Role;
    this.getMentorStudents(this.mentor.RoleID);

    const pageName: string = 'Students';
    breadcrumb.makeCurrentPage(pageName, router.url, state);
    breadcrumb.setPrevPages();
  }

  public addStudent(): void {
    const dialogRef = this.dialog.open(AddStudentDialog, {
      panelClass: 'custom-dialog'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response){
        let student = new Role(response);
        student.Person = new Student(response.student);
        this.allStudents.push(student);
        this.snackbar.open('Student successfully added!', '', { duration: 3000 });
      }
    });
  }

  public async getAllStudents(): Promise<void> {
    this.allStudents = [];
    const response = await this.studentService.GetAllStudents();
    for (let st of response){
      let s = new Role(st);
      s.Person = new Student(st.student);
      this.allStudents.push(s);
    }
  }

  public async getMentorStudents(id: string): Promise<any> {
    this.myStudents = [];
    const response = await this.mentorService.GetMentorStudents(id);
    if (response) {
      for (let s of response){
        let student = new Role(s);
        student.Person = new Student(s.student);
        this.myStudents.push(student);
      }
      this.mentorService.emitChange(response.length);
    }
  }

  public updateMyStudents(update: string) {
    if (update == 'updated'){
      this.getAllStudents();
      this.getMentorStudents(this.mentor.RoleID);
    }
  }
}
