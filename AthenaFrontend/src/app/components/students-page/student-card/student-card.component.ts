import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/models/role.model';
import { ViewStudentDialog } from '../view-student-dialog/view-student-dialog';
import { Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MentorService } from 'src/app/services/mentor.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent {
  @Input() students: Role[] = [];
  @Input() role: any;
  @Output() studentUpdate = new EventEmitter<string>();

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar, public mentorService: MentorService, public authService: AuthService) { }

  public emitStudentUpdate() {
    this.studentUpdate.emit('updated');
  }

  public async viewStudent(student: Role, role: Role): Promise<void> {
    const dialogRef = this.dialog.open(ViewStudentDialog, {
      panelClass: 'custom-dialog',
      data: { student: student, role: role }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response == true) {
        this.snackbar.open('Student successfully updated!', '', { duration: 3000 });
        this.emitStudentUpdate();
      } else if (response == false) {
        this.snackbar.open('There was an error in updating the student. Please try again later.', '', { duration: 3000 });
      }
    });
  }

}
