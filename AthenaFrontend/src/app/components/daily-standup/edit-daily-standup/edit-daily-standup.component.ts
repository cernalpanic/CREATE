import { Component, Inject } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DailyStandupService } from '../../../services/dailyStandup.service';
import { Router } from '@angular/router';
import { Role } from 'src/models/role.model';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthToken } from '../../../../models/authtoken.model';
import { StudentService } from '../../../services/student.service';
import { UnknownReference } from '@angular/compiler-cli/src/ngtsc/reflection';
import { Student } from 'src/models/student.model';


export interface StandupData {
  YesterdayTask: string;
  TodayPlan: string;
  Blockers: string;
  AdminFeedback: string;
}

@Component({
  selector: 'app-edit-daily-standup',
  templateUrl: './edit-daily-standup.component.html',
  styleUrls: ['./edit-daily-standup.component.css']
})
export class EditDailyStandupComponent {
  public standup: DailyStandup;
  public dsYesterdayTask = new FormControl('', [Validators.required]);
  public dsTodayPlan = new FormControl('', [Validators.required]);
  public dsBlockers = new FormControl('', [Validators.required]);
  public dsAdminFeedback = new FormControl('', [Validators.required]);
  public changes: boolean = false;
  public canEdit: boolean;
  public role: any;
  public auth: any;
  public student: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditDailyStandupComponent>, public dailyStandupService: DailyStandupService, public authService: AuthService, public studentService: StudentService, private router: Router) {
    this.standup = this.data.standup;
    this.canEdit = this.data.canEdit;
    this.dsYesterdayTask.setValue(this.standup.yesterdayTask);
    this.dsTodayPlan.setValue(this.standup.todayPlan);
    this.dsBlockers.setValue(this.standup.blockers);
    this.dsAdminFeedback.setValue(this.standup.adminFeedback);
  }

  public async ngOnInit() {
    const response = await this.authService.getAuthentication();
    this.auth = new AuthToken(response);
    this.role = this.auth.Role;
    if (this.role.Name == "Student") {
      const student = await this.studentService.GetStudent(this.role.RoleID);
      this.student = student.student;
    }
    else{
      this.student = this.data.student;
    }
  }

  public updateDailyStandup(): void {
    const newYesterdayTask = this.dsYesterdayTask.value || '';
    const newTodayPlan = this.dsTodayPlan.value || '';
    const newBlockers = this.dsBlockers.value || '';
    const newAdminFeedback = this.dsAdminFeedback.value || '';

    //update the standup
    this.dailyStandupService.UpdateDailyStandup(this.standup.standupID.toString(), newYesterdayTask, newTodayPlan, newBlockers, newAdminFeedback).then((result: boolean) => {
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

  public okClose(): void {
    this.updateDailyStandup();
  }

  private refreshPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    //Mentor is viewing from student card and needs to pass the student back
    if(this.role.Name != "Student")
      this.router.navigate([this.router.url], {state: { student: this.student, auth: this.auth, expectedRole: 'Mentor' }});
    //Student is viewing from dashboard and does not need additional parameters
    else
      this.router.navigate([this.router.url]);
  }

}