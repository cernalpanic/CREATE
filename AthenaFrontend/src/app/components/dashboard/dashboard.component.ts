import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MentorService } from 'src/app/services/mentor.service';
import { StudentService } from 'src/app/services/student.service';
import { ModuleService } from 'src/app/services/module.service';
import { AddMentorDialog } from './add-mentor-dialog/add-mentor-dialog';
import { Role } from 'src/models/role.model';
import { DailyStandup } from 'src/models/dailystandup';
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
  public currentUser: any;

  public standups: DailyStandup[] = [];

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
      const student = await this.studentService.GetStudent(this.role.RoleID);
      this.role.Person = new Student(this.role.Person);
      this.currentUser = student.student;
      await this.getAllDailyStandups(this.role.RoleID);
      this.updateStreaks();
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

  public async getAllDailyStandups(id: string): Promise<void> {
      this.standups = [];
      const response = await this.dailyStandupService.GetAllDailyStandups(id);
      if (response) {
        for (let ds of response) {
          const standup = new DailyStandup(ds.standupID, ds.studentID, ds.userID, ds.dateCreated, ds.yesterdayTask, ds.todayPlan, ds.blockers, ds.adminFeedback);
          this.standups.push(standup);
        }
      }
    }
  
  //This function assumes that once a dailystandup is completed, it will stay completed.
  private async updateStreaks(){
    //Today's not complete and missed yesterday's
    if(this.standups[0].yesterdayTask.trim() == '' || this.standups[0].todayPlan.trim() == '' || this.standups[0].blockers.trim() == ''){
      //previous not complete, two missed resets streak
      if(this.standups[1].yesterdayTask.trim() == '' || this.standups[1].todayPlan.trim() == '' || this.standups[1].blockers.trim() == '' || this.areMoreThanOneDayApart(new Date(this.standups[0].dateCreated), new Date(this.standups[1].dateCreated))){
        this.currentUser.currentStandupStreak = 0;
      }
    }
    //Today's complete
    //Loop through till find incomplete
    else{
      let completed = 0;
      let previousDate = new Date(this.standups[0].dateCreated);
      for(let i = 0; i < this.standups.length; i++){
        if(this.standups[i].yesterdayTask.trim() == '' || this.standups[i].todayPlan.trim() == '' || this.standups[i].blockers.trim() == '' || this.areMoreThanOneDayApart(previousDate, new Date(this.standups[i].dateCreated))){
          break;
        }
        completed += 1;
        previousDate = new Date(this.standups[i].dateCreated);
      }
      this.currentUser.currentStandupStreak = completed;
    }
    
    //check if longest streak is less than current streak
    if(this.currentUser.currentStandupStreak > this.currentUser.longestStandupStreak){
      this.currentUser.longestStandupStreak = this.currentUser.currentStandupStreak;
    }

    const studentUpdate = {
      roleID: this.role.RoleID,
      person: {
        CurrentStandupStreak: this.currentUser.currentStandupStreak,
        LongestStandupStreak: this.currentUser.longestStandupStreak
      }
    };

    const response = await this.studentService.UpdateStudent(studentUpdate);
  }

  //Taken from ChatGPT, thanks ChatGPT
  private areMoreThanOneDayApart(date1: Date, date2: Date){
    const oneDayMs = 24 * 60 * 60 * 1000;
    date1.setHours(0, 0, 0, 0);;
    date2.setHours(0, 0, 0, 0);

    return Math.abs(date1.getTime() - date2.getTime()) > oneDayMs;
  }
}
