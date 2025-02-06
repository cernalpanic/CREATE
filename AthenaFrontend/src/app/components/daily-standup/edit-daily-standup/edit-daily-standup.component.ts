import { Component, Inject, } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { DailyStandupService } from '../../../services/dailyStandup.service';
import { Router } from '@angular/router';

export interface StandupData {
  Description: string;
}

@Component({
  selector: 'app-edit-daily-standup',
  templateUrl: './edit-daily-standup.component.html',
  styleUrls: ['./edit-daily-standup.component.css']
})
export class EditDailyStandupComponent {
  public standup: DailyStandup;
  public dsDescription = new FormControl('', [Validators.required]);
  public changes: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditDailyStandupComponent>, public dailyStandupService: DailyStandupService, private router: Router) {
    this.standup = this.data.standup;
    this.dsDescription.setValue(this.standup.description);
  }

  public updateDailyStandup(): void {
    const newDescription = this.dsDescription.value || '';

    this.dailyStandupService.UpdateDailyStandup(this.standup.standupID.toString(), newDescription).then((result: boolean) => {
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
