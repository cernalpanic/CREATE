import { Component, Input } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DailyStandupService } from '../../services/dailyStandup.service';
import { AuthToken } from 'src/models/authtoken.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StudentService } from 'src/app/services/student.service'

@Component({
  selector: 'app-daily-standup',
  templateUrl: './daily-standup.component.html',
  styleUrls: ['./daily-standup.component.css']
})
export class DailyStandupComponent {
  public standups: DailyStandup[] = [];
  public role: any;
  protected auth: any;
  public student: any;

  constructor(private authService: AuthService, private studentService: StudentService, public dailyStandupService: DailyStandupService, public snackbar: MatSnackBar, public router: Router) {

  }

  private async getAuthentication(): Promise<AuthToken> {
    return await this.authService.getAuthentication();
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

  private isToday(dbDate: any): boolean {
    const today = new Date();
    const date = new Date(dbDate);

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );

  }

  public async ngOnInit(): Promise<void> {
    const response = await this.getAuthentication();
    this.auth = new AuthToken(response);
    this.role = this.auth.Role;
    if (this.role.Name == 'Student') {
      const student = await this.studentService.GetStudent(this.role.RoleID);
      this.student = student.student;

      await this.getAllDailyStandups(this.role.RoleID);

      if (this.standups.length == 0 || !(this.isToday(this.standups[0].dateCreated))) {
        await this.dailyStandupService.AddDailyStandup(this.role);
      }

      await this.getAllDailyStandups(this.role.RoleID);
    }
    this.updateStreaks();
  }


  //This function assumes that once a dailystandup is completed, it will stay completed.
  private async updateStreaks() {
    //Today's not complete and missed yesterday's
    if (this.standups[0].yesterdayTask.trim() == '' || this.standups[0].todayPlan.trim() == '' || this.standups[0].blockers.trim() == '') {
      //previous not complete, two missed resets streak
      if (this.standups[1].yesterdayTask.trim() == '' || this.standups[1].todayPlan.trim() == '' || this.standups[1].blockers.trim() == '' || this.areMoreThanOneDayApart(new Date(this.standups[0].dateCreated), new Date(this.standups[1].dateCreated))) {
        this.student.currentStandupStreak = 0;
      }
    }
    //Today's complete
    //Loop through till find incomplete
    else {
      let completed = 0;
      let previousDate = new Date(this.standups[0].dateCreated);
      for (let i = 0; i < this.standups.length; i++) {
        if (this.standups[i].yesterdayTask.trim() == '' || this.standups[i].todayPlan.trim() == '' || this.standups[i].blockers.trim() == '' || this.areMoreThanOneDayApart(previousDate, new Date(this.standups[i].dateCreated))) {
          break;
        }
        completed += 1;
        previousDate = new Date(this.standups[i].dateCreated);
      }
      this.student.currentStandupStreak = completed;
    }

    //check if longest streak is less than current streak
    if (this.student.currentStandupStreak > this.student.longestStandupStreak) {
      this.student.longestStandupStreak = this.student.currentStandupStreak;
    }

    const studentUpdate = {
      roleID: this.role.RoleID,
      person: {
        CurrentStandupStreak: this.student.currentStandupStreak,
        LongestStandupStreak: this.student.longestStandupStreak
      }
    };

    const response = await this.studentService.UpdateStudent(studentUpdate);
  }

  //Taken from ChatGPT, thanks ChatGPT
  private areMoreThanOneDayApart(date1: Date, date2: Date) {
    const oneDayMs = 24 * 60 * 60 * 1000;
    date1.setHours(0, 0, 0, 0);;
    date2.setHours(0, 0, 0, 0);

    return Math.abs(date1.getTime() - date2.getTime()) > oneDayMs;
  }

}
