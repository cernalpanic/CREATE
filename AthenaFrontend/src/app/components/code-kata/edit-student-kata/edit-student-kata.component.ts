import { Component, Inject } from '@angular/core';
import { StudentKata } from 'src/models/studentkata.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { AuthToken } from '../../../../models/authtoken.model';
import { StudentService } from '../../../services/student.service';
import { Kata } from 'src/models/kata.model';
import { KataService } from 'src/app/services/kata.service';

@Component({
  selector: 'app-edit-student-kata',
  templateUrl: './edit-student-kata.component.html',
  styleUrls: ['./edit-student-kata.component.css']
})
export class EditStudentKataComponent {
  public kata: Kata;
  public studentKata: StudentKata;
  public studentCode = new FormControl('', [Validators.required]);
  public studentNotes = new FormControl('', [Validators.required]);
  public completionTime = new FormControl('', [Validators.required]);
  public adminFeedback = new FormControl('', [Validators.required]);
  public changes: boolean = false;
  public role: any;
  public auth: any;
  public student: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditStudentKataComponent>, public kataService: KataService, public authService: AuthService, public studentService: StudentService, private router: Router) {
    this.kata = this.data.kata;
    this.studentKata = this.data.studentKata;
    console.log(this.kata);
    this.studentCode.setValue(this.studentKata.StudentCode);
    this.studentNotes.setValue(this.studentKata.StudentNotes);
    this.completionTime.setValue(this.studentKata.CompletionTime);
    this.adminFeedback.setValue(this.studentKata.AdminFeedback);
  }

  public async ngOnInit(): Promise<void> {
    const response = await this.authService.getAuthentication();
    this.auth = new AuthToken(response);
    this.role = this.auth.Role;
    console.log(this.role);
    if (this.role.Name == "Student") {
      const student = await this.studentService.GetStudent(this.role.RoleID);
      this.student = student.student;
    }
  }

  public updateStudentKata(): void {
    const newStudentCode = this.studentCode.value || '';
    const newStudentNotes = this.studentNotes.value || '';
    const completionTime = this.completionTime.value || '';
    const newAdminFeedback = this.adminFeedback.value || '';

    let completed = false;
    if (newStudentCode != '' && newStudentCode != null)
      completed = true;

    //update the standup
    this.kataService.UpdateStudentKata(this.kata.KataID.toString(), this.studentKata.StudentID.toString(), completed, completionTime, newStudentCode, newStudentNotes, newAdminFeedback).then((result: boolean) => {
      if (result) {
        this.dialogRef.close(true);
        this.refreshPage();
      }
      else {
        console.error('Failed to update student kata.');
      }
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  public okClose(): void {
    this.updateStudentKata();
  }

  private refreshPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
