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
  @Input() role: any;

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) { }

  statusText = 'Not Completed';
  thisdate = new Date;

  public async editStandup(standup: DailyStandup, role: Role): Promise<void> {
    this.dialog.open(EditDailyStandupComponent, {
      panelClass: 'standup-dialog',
      data: { standup: standup, role: role }
    });
  }

}

