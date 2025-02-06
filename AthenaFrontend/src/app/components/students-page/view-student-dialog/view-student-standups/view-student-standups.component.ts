import { Component, Input } from '@angular/core';
import { DailyStandup } from 'src/models/dailystandup';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-view-student-standups',
  templateUrl: './view-student-standups.component.html',
  styleUrls: ['./view-student-standups.component.css']
})
export class ViewStudentStandupsComponent {
  @Input() standups: DailyStandup[] = [];

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar) { }

  statusText = 'Not Completed';
  thisdate = new Date;

}
