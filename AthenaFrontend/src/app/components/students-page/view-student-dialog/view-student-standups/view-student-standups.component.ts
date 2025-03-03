import { Component, Input } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditDailyStandupComponent } from '../../../daily-standup/edit-daily-standup/edit-daily-standup.component';
import { Role } from 'src/models/role.model';
import { PaginatePipe } from 'ngx-pagination';
import { PaginationControlsComponent } from 'ngx-pagination';

@Component({
  selector: 'app-view-student-standups',
  templateUrl: './view-student-standups.component.html',
  styleUrls: ['./view-student-standups.component.css']
})
export class ViewStudentStandupsComponent {
  @Input() standups: DailyStandup[] = [];
  public p: any; //used for talbe pagination
  panelOpenState = false;

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) { }

  statusText = 'Not Completed';
  thisdate = new Date;

  public async editStandup(standup: DailyStandup): Promise<void> {
    this.dialog.open(EditDailyStandupComponent, {
      panelClass: 'standup-dialog',
      data: { standup: standup, canEdit: true }
    });
  }
}
