import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { AuthToken } from 'src/models/authtoken.model';
import { Router } from '@angular/router';
import { Student } from 'src/models/student.model';
import { Mentor } from 'src/models/mentor.model';
import { MentorService } from './services/mentor.service';
import { BreadcrumbService } from './services/breadcrumb.service';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'CREATE';
  public role: any;
  protected auth: any;
  public studentNum: number = 0;
  public studentProgress: number = 0;
  public studentTitle: string = '';
  public nextRank: number = 0;
  public activePage: string = '';

  constructor(
    private authService: AuthService,
    public router: Router,
    public mentorService: MentorService,
    public studentService: StudentService,
    public breadcrumb: BreadcrumbService
  ) {
    this.initialize();
    this.mentorService.changeEmitted$.subscribe((mentorStudents) => {
      this.studentNum = mentorStudents;
    });
    this.authService.changeEmitted$.subscribe((auth) => {
      this.syncAuthUpdates(auth);
    });
    this.breadcrumb.changeEmitted$.subscribe((active) => {
      this.activePage = active;
    })
  }

  public async initialize() {
    if (
      this.authService.token != undefined &&
      this.authService.token != null &&
      this.authService.token != '' &&
      this.authService.token != '00000000-0000-0000-0000-000000000000'
    ) {
      const authResponse = await this.authService.isAuthenticated();
      if (authResponse) {
        const response = await this.getAuthentication();
        this.auth = new AuthToken(response);
        this.role = this.auth.Role;
        if (this.role.Name == 'Student') {
          this.role.Person = new Student(this.role.Person);
        } else if (this.role.Name == 'Mentor') {
          this.role.Person = new Mentor(this.role.Person);
        }
        if (this.role.Name == 'Mentor') {
          this.getMentorStudentsNum(this.role.RoleID);
        } else {
          this.getOverallProgress(this.role.RoleID);
        }
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  private syncAuthUpdates(auth: any) {
    this.auth = new AuthToken(auth);
    this.role = this.auth.Role;
    if (this.role.Name == 'Student') {
      this.role.Person = new Student(this.role.Person);
    } else if (this.role.Name == 'Mentor') {
      this.role.Person = new Mentor(this.role.Person);
    }
  }

  private async getAuthentication(): Promise<AuthToken> {
    return await this.authService.getAuthentication();
  }

  public async getMentorStudentsNum(id: string): Promise<void> {
    const response = await this.mentorService.GetMentorStudents(id);
    if (response) {
      this.studentNum = response.length;
    }
  }

  public async getOverallProgress(id: string): Promise<void> {
    const response = await this.studentService.GetOverallProgress(id);
    if (response) {
      const overall = response.OverallExp;
      const expGained = response.StudentExp;

      this.studentProgress = Math.round((expGained / overall) * 100);
      if (Number.isNaN(this.studentProgress)) {
        this.studentProgress = 0;
        this.nextRank = 0;
        this.studentTitle = 'Beginner';
      } else {
        const rank = this.role.Person.getRank(overall, expGained);
        this.studentTitle = rank.Title;
        this.nextRank = rank.NewRankExp;
      }
    }
  }

  // set role to null
  // logout the user
  public logout() {
    this.role = null;
    this.authService.logout();
  }
}
