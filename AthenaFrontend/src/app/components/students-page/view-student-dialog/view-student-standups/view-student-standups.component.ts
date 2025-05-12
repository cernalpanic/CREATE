import { Component, Input } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EditDailyStandupComponent } from '../../../daily-standup/edit-daily-standup/edit-daily-standup.component';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { Role } from 'src/models/role.model';

@Component({
  selector: 'app-view-student-standups',
  templateUrl: './view-student-standups.component.html',
  styleUrls: ['./view-student-standups.component.css']
})
export class ViewStudentStandupsComponent {
  @Input() standups: DailyStandup[] = [];
  @Input() student: any;
  displayedColumns: string[] = ["standup_date", "completed", "add_feedback"];

  //paginator setup
  pageSize = 5; //default page size
  pageIndex = 0; //intial page index
  pageSizeOptions = [5, 10, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  paginatedLower = 0;
  paginatedUpper = 6;

  pageEvent: any;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get lower and upper pagination bounds
    this.paginatedLower = (this.pageIndex * this.pageSize);
    this.paginatedUpper = (this.pageIndex * this.pageSize) + this.pageSize + 1;
  }

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) { }

  statusText = 'Not Completed';
  thisdate = new Date;

  public async editStandup(standup: DailyStandup, student: any): Promise<void> {
    this.dialog.open(EditDailyStandupComponent, {
      panelClass: 'standup-dialog',
      data: { standup: standup, canEdit: true, student: student }
    });
  }
}
