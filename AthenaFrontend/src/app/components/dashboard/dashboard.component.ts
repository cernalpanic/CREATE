import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MentorService } from 'src/app/services/mentor.service';
import { StudentService } from 'src/app/services/student.service';
import { ModuleService } from 'src/app/services/module.service';
import { AddMentorDialog } from './add-mentor-dialog/add-mentor-dialog';
import { Role } from 'src/models/role.model';
import { Mentor } from 'src/models/mentor.model';
import { Student } from 'src/models/student.model';
import { Module } from 'src/models/module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthToken } from 'src/models/authtoken.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DailyStandupService } from 'src/app/services/dailyStandup.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public mentorStudents: Role[] = [];
  public allStudents: Role[] = [];
  public auth: AuthToken | any;
  public role: Role | any;
  public showM: boolean = false;
  public showS: boolean = false;

  public allModules: Module[] = [];
  public studentMentors: any;

  constructor(
    public dialog: MatDialog,
    public mentorService: MentorService,
    public studentService: StudentService,
    public snackbar: MatSnackBar,
    public router: Router,
    public moduleService: ModuleService,
    public dailyStandupService: DailyStandupService,
    public authService: AuthService,
    public breadcrumb: BreadcrumbService
  ) {
    this.initialize();

    const pageName: string = 'dashboard';
    breadcrumb.makeCurrentPage(pageName, router.url, '');
    breadcrumb.setPrevPages();
  }

  public async initialize() {
    const response = await this.authService.getAuthentication();
    this.auth = new AuthToken(response);
    this.role = this.auth.Role;
    if (this.role.Name == 'Student') {
      this.role.Person = new Student(this.role.Person);
      this.showS = true;
    } else if (this.role.Name == 'Mentor') {
      this.role.Person = new Mentor(this.role.Person);
      this.showM = true;
    }
    if (this.role.Name == 'Mentor')
      await this.getMentorStudents(this.role.RoleID);
    if (this.role.Name == 'Student')
      await this.getStudentMentors(this.role.RoleID);
    this.getAllModules();
  }

  public async getAllModules(): Promise<void> {
    this.allModules = [];
    const response = await this.moduleService.GetAllModules();
    for (let mod of response) {
      let module = new Module(mod);
      this.allModules.push(module);
    }
  }

  public async getStudentMentors(id: string): Promise<any> {
    this.studentMentors = [];
    const response = await this.studentService.GetStudentMentors(id);
    if (response) {
      for (let m of response) {
        let mentor = new Role(m);
        mentor.Person = new Mentor(m.mentor);
        this.studentMentors.push(mentor);
      }
      this.studentService.emitChange(response.length);
    }
  }

  public addMentor(): void {
    const dialogRef = this.dialog.open(AddMentorDialog, {
      panelClass: 'custom-dialog',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        let mentor = new Role(response);
        mentor.Person = new Mentor(response.mentor);
        this.snackbar.open('Mentor successfully added!', '', {
          duration: 3000,
        });
      }
    });
  }

  public async getMentorStudents(id: string): Promise<any> {
    this.mentorStudents = [];
    const response = await this.mentorService.GetMentorStudents(id);
    if (response) {
      for (let s of response) {
        let student = new Role(s);
        student.Person = new Student(s.student);
        this.mentorStudents.push(student);
      }
      this.mentorService.emitChange(response.length);
    }
  }

  public updateMyStudents(update: string) {
    if (update == 'updated') {
      this.getMentorStudents(this.role.RoleID);
    }
  }

  //Adds a daily standup to all students under logged in mentor
  public async addDailyStandups(): Promise<void> {
    for (const student of this.mentorStudents) {
      const response = await this.dailyStandupService.AddDailyStandup(student);
    }
    this.snackbar.open('Daily Standups successfully added!', '', {
      duration: 3000,
    });
  }
}
