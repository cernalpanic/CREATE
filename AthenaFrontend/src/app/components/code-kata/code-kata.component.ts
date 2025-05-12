import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kata } from 'src/models/kata.model';
import { ModuleService } from 'src/app/services/module.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthToken } from 'src/models/authtoken.model';
import { Student } from 'src/models/student.model';
import { Mentor } from 'src/models/mentor.model';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { KataService } from 'src/app/services/kata.service';
import { StudentKata } from 'src/models/studentkata.model';
import { CreateKataDialogComponent } from './create-kata-dialog/create-kata-dialog.component';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-code-kata',
  templateUrl: './code-kata.component.html',
  styleUrls: ['./code-kata.component.css']
})

export class CodeKataComponent {
  public katas: Kata[] = [];
  public paginatedKatas: Kata[] = [];
  public studentKatas: StudentKata[] = [];
  public paginatedStudentKatas: StudentKata[] = [];
  public role: any;

  //paginator setup
  pageSize = 9; //default page size
  pageIndex = 0; //intial page index
  pageSizeOptions = [9, 12, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  //default lower and upper (6 katas)
  paginatedLower = 0;
  paginatedUpper = 9;

  pageEvent: any;

  //Mentor View Paginator
  handleKataPageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get lower and upper pagination bounds
    this.paginatedLower = (this.pageIndex * this.pageSize);
    this.paginatedUpper = (this.pageIndex * this.pageSize) + this.pageSize;

    //set paginated katas
    this.paginatedKatas = this.katas.slice(this.paginatedLower, this.paginatedUpper);
  }

  //Student View Paginator
  handleStudentKataPageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get lower and upper pagination bounds
    this.paginatedLower = (this.pageIndex * this.pageSize);
    this.paginatedUpper = (this.pageIndex * this.pageSize) + this.pageSize;

    //set paginated katas
    this.paginatedStudentKatas = this.studentKatas.slice(this.paginatedLower, this.paginatedUpper);
  }



  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public moduleService: ModuleService,
    public router: Router,
    public authService: AuthService,
    public breadcrumb: BreadcrumbService,
    public kataService: KataService,
  ) {

    const pageName: string = 'code-kata';
    breadcrumb.makeCurrentPage(pageName, router.url, '');
    breadcrumb.setPrevPages();
  }



  public async ngOnInit() {
    const response = await this.authService.getAuthentication();
    const auth = new AuthToken(response);
    this.role = auth.Role;
    if (this.role.Name == 'Student') {
      this.role.Person = new Student(this.role.Person);
      const studentKatasResult: StudentKata[] = await this.kataService.GetStudentKatas(this.role.RoleID);
      studentKatasResult.forEach(sk => {
        let studentkata = new StudentKata(sk);
        this.studentKatas.push(studentkata);
      });

      this.paginatedStudentKatas = this.studentKatas.slice(this.paginatedLower, this.paginatedUpper);

    } else if (this.role.Name == 'Mentor') {
      this.role.Person = new Mentor(this.role.Person);
    }
    //katas array is needed for both mentors and students
    const katasResult: Kata[] = await this.kataService.GetKatas();
    katasResult.forEach(k => {
      let kata = new Kata(k);
      this.katas.push(kata);
    });

    if (this.role.Name == 'Student') {
      let needsRefresh = false;
      for (let kata of this.katas)//Populate student katas to show all student katas(Currently needs a refresh to display new katas)
      {
        if (this.createStudentKata(this.getStudentKataForKata(kata), kata))
          needsRefresh = true;
      }
      if (needsRefresh) {
        this.refreshPage();
      }
    }

    this.paginatedKatas = this.katas.slice(this.paginatedLower, this.paginatedUpper);


  }


  getStudentKataForKata(kata: Kata): StudentKata | undefined {
    return this.studentKatas?.find(sk => sk.KataID === kata.KataID);
  }

  public getKata(kataID: string): any {
    let returnKata: any = null;
    this.katas.forEach(k => {
      if (k.KataID == kataID) {
        returnKata = k;
      }
    });
    return returnKata; //Should always be assigned to a kata object
  }

  openCreateKataDiaglogue(): void {
    this.dialog.open(CreateKataDialogComponent, {
      panelClass: 'kata-dialog',
    });

  }

  createStudentKata(sk: StudentKata | undefined, k: Kata) {
    if (!sk) {
      this.kataService.AddStudentKata(this.role.RoleID, k.KataID);
      return true;
    } else {
      return false;
    }
  }

  private refreshPage(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }
}
