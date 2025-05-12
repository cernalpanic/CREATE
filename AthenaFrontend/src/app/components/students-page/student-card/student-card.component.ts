import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Role } from 'src/models/role.model';
import { ViewStudentDialog } from '../view-student-dialog/view-student-dialog';
import { Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MentorService } from 'src/app/services/mentor.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthToken } from 'src/models/authtoken.model';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.css']
})
export class StudentCardComponent {
  @Input() students: Role[] = [];
  @Output() studentUpdate = new EventEmitter<string>();
  public auth: any;
  public role: any;

  constructor(public dialog: MatDialog, public snackbar: MatSnackBar, public mentorService: MentorService, public authService: AuthService) { }

  public async ngOnInit(): Promise<void> {
    const response = await this.authService.getAuthentication();
    this.auth = new AuthToken(response);
    this.role = this.auth.Role;
  }

  public emitStudentUpdate() {
    this.studentUpdate.emit('updated');
  }

}
