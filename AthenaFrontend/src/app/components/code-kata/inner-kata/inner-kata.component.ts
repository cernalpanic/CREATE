import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { KataService } from 'src/app/services/kata.service';
import { Kata } from 'src/models/kata.model';
import { StudentKata } from 'src/models/studentkata.model';
import { Student } from 'src/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { EditStudentKataComponent } from '../edit-student-kata/edit-student-kata.component';
import { Role } from 'src/models/role.model';

@Component({
  selector: 'app-inner-kata',
  templateUrl: './inner-kata.component.html',
  styleUrls: ['./inner-kata.component.css']
})
export class InnerKataComponent {
  public kata: Kata;
  public studentKatas: StudentKata[] = [];
  public studentNames: string[] = [];
  displayedColumns: string[] = ["student_name", "completion_time", "add_feedback"];

  //paginator setup
  pageSize = 5; //default page size
  pageIndex = 0; //intial page index
  pageSizeOptions = [5, 10, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  paginatedLower = 0;
  paginatedUpper = 5;

  pageEvent: any;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get lower and upper pagination bounds
    this.paginatedLower = (this.pageIndex * this.pageSize);
    this.paginatedUpper = (this.pageIndex * this.pageSize) + this.pageSize + 1;
  }

  constructor(private router: Router, public dialog: MatDialog, public kataService: KataService, public studentService: StudentService, public breadcrumb: BreadcrumbService) {
    //Get the kata from the router state
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      kata: Kata;
    };
    this.kata = state.kata;

    //Set the breadcrumb
    const pageName: string = this.kata.KataName;
    breadcrumb.makeCurrentPage(pageName, router.url, state);
    breadcrumb.setPrevPages();
  }

  public async ngOnInit(): Promise<void> {
    //Get all student katas and student names and filter by the current kata and complete
    const katas: StudentKata[] = await this.kataService.GetAllStudentKatas();
    for (let i = 0; i < katas.length; i++) {
      const sk = new StudentKata(katas[i]);
      if (sk.KataID == this.kata.KataID && sk.Complete == true) {
        this.studentKatas.push(sk);
        const studentName = await this.getStudentName(sk);
        this.studentNames.push(studentName);
      }
    }
  }

  private async getStudentName(sk: StudentKata): Promise<string> {
    const student: Role = new Role(await this.studentService.GetStudent(sk.StudentID));
    console.log(student);
    return student.Person.firstName + " " + student.Person.lastName;
  }

  public async editKata(studentKata: StudentKata): Promise<void> {
    this.dialog.open(EditStudentKataComponent, {
      panelClass: 'kata-dialog',
      data: { studentKata: studentKata, kata: this.kata }
    });
  }
}
