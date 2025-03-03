import { Component, Input } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditDailyStandupComponent } from '../edit-daily-standup/edit-daily-standup.component';
import { Role } from 'src/models/role.model';

@Component({
  selector: 'app-daily-standup-card',
  templateUrl: './daily-standup-card.component.html',
  styleUrls: ['./daily-standup-card.component.css']
})


export class DailyStandupCardComponent {
  @Input() standups: DailyStandup[] = [];
  public today: Date;

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) {
    this.today = new Date();
    this.today.setHours(0,0,0,0);
   }

  statusText = 'Not Completed';
  thisdate = new Date();

  public async editStandup(standup: DailyStandup, canEdit: boolean): Promise<void> {
    this.dialog.open(EditDailyStandupComponent, {
      panelClass: 'standup-dialog',
      data: { standup: standup, canEdit: canEdit }
    });
  }

}

