import { Component, Inject, } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DailyStandupService } from '../../../services/dailyStandup.service';
import { Router } from '@angular/router';
import { Role } from 'src/models/role.model';


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
  public role: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditDailyStandupComponent>, public dailyStandupService: DailyStandupService, private router: Router) {
    this.standup = this.data.standup;
    this.role = this.data.role;
    this.dsYesterdayTask.setValue(this.standup.yesterdayTask);
    this.dsTodayPlan.setValue(this.standup.todayPlan);
    this.dsBlockers.setValue(this.standup.blockers);
    this.dsAdminFeedback.setValue(this.standup.adminFeedback);

  }

  public updateDailyStandup(): void {
    const newYesterdayTask = this.dsYesterdayTask.value || '';
    const newTodayPlan = this.dsTodayPlan.value || '';
    const newBlockers = this.dsBlockers.value || '';
    const newAdminFeedback = this.dsAdminFeedback.value || '';

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
    this.router.navigate([this.router.url]);
  }

}
