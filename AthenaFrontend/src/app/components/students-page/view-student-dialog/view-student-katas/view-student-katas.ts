import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { StudentKata } from 'src/models/studentkata.model';
import { EditStudentKataComponent } from 'src/app/components/code-kata/edit-student-kata/edit-student-kata.component';
import { Kata } from 'src/models/kata.model';

@Component({
  selector: 'app-view-student-katas',
  templateUrl: './view-student-katas.html',
  styleUrls: ['./view-student-katas.css']
})
export class ViewStudentKatasComponent {
  @Input() katas: StudentKata[] = [];
  displayedColumns: string[] = ["kata_name", "completed", "add_feedback"];

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

  public async editKata(studentKata: StudentKata): Promise<void> {
    this.dialog.open(EditStudentKataComponent, {
      panelClass: 'kata-dialog',
      data: {studentKata: studentKata}
    });
  }
}
