import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Role } from 'src/models/role.model';
import { MentorService } from 'src/app/services/mentor.service';
import { Mentor } from 'src/models/mentor.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipListbox } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { DailyStandup } from 'src/models/dailystandup';
import { DailyStandupService } from '../../../services/dailyStandup.service';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';


export interface StudentData {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
}

@Component({
  selector: 'app-view-student-dialog',
  templateUrl: './view-student-dialog.html',
  styleUrls: ['./view-student-dialog.css']
})
export class ViewStudentDialog implements OnInit {
  public student: Role;
  public mentors: Role[] = [];
  public selectedMentors: Role[] = [];
  public allMentors: Role[] = [];
  public changes: boolean = false;
  public standups: DailyStandup[] = [];

  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public mentorCtrl = new FormControl(null);
  public filteredMentors: Role[] = [];
  constructor(public router: Router, public mentorService: MentorService, public dailyStandupService: DailyStandupService, public studentService: StudentService, public breadcrumb: BreadcrumbService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      student: Role;
    };
    this.student = state.student;


    const pageName: string = this.student.Person.FirstName + this.student.Person.LastName;
    breadcrumb.makeCurrentPage(pageName, router.url, state);
    breadcrumb.setPrevPages();
  }

  public ngOnInit(): void {
    this.getStudentMentors(this.student.RoleID);
    this.getAllMentors();
    this.getAllDailyStandups(this.student.RoleID);

    this.mentorCtrl.valueChanges.subscribe((mentor: Role | null) => {
      this.filterMentors(mentor);
      this.changes = true;
    });
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add our mentor
    if (value != undefined && value != null) {
      console.log(value)
      this.selectedMentors.push(this.allMentors.find((x: Role) => x.RoleID == value.trim())!);
    }
    console.log()
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.saveChanges();
    this.mentorCtrl.setValue(null);

  }

  public remove(indx: number): void {
    const deleted = this.selectedMentors.splice(indx, 1);
    this.filteredMentors.push(deleted[0]);
    this.saveChanges();
  }

  public selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedMentors.push(event.option.value);
    //this.mentorInput.nativeElement.value = '';
    this.mentorCtrl.setValue(null);
    this.saveChanges();
  }

  private filterMentors(mentor: Role | null): void {
    if (mentor == null) {
      return;
    } else {
      let index = this.filteredMentors.findIndex(m => m.RoleID == mentor.RoleID);
      this.filteredMentors.splice(index, 1);
    }
  }

  public async getAllMentors(): Promise<any> {
    const response = await this.mentorService.GetAllMentors();
    if (response) {
      response.forEach((m: any) => {
        let mentor = new Role(m);
        mentor.Person = new Mentor(m.person);
        this.allMentors.push(mentor);

        //Add it to the filtered mentors if student isn't already assigned the mentor
        let addFilteredMentor = true;
        this.mentors.forEach((ment: Role) => {
          if (ment.RoleID == mentor.RoleID) {
            addFilteredMentor = false;
          }
        });
        if (addFilteredMentor) {
          this.filteredMentors.push(mentor);
        }
      });
    }
  }

  public async getStudentMentors(StudentID: string): Promise<any> {
    const response = await this.studentService.GetStudentMentors(StudentID);
    if (response) {
      response.forEach((m: any) => {
        let mentor = new Role(m);
        mentor.Person = new Mentor(m.person);
        this.mentors.push(mentor);
        this.selectedMentors.push(mentor);
      });
    }
  }

  public async saveChanges(): Promise<void> {
    await this.studentService.SaveStudentMentors(this.student.RoleID, this.selectedMentors);
  }





  // public okClose(): void {
  //   this.dialogRef.close(true);
  // }

  public async getAllDailyStandups(id: string): Promise<void> {
    this.standups = [];
    const response = await this.dailyStandupService.GetAllDailyStandups(id);
    if (response) {
      for (let ds of response) {
        const standup = new DailyStandup(ds.standupID, ds.studentID, ds.userID, ds.dateCreated, ds.yesterdayTask, ds.todayPlan, ds.blockers, ds.adminFeedback);
        this.standups.push(standup);
      }
    }
  }
}
