import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Role } from 'src/models/role.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl: any;
  private postHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public AddStudent(student: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Students', JSON.stringify(student), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetAllStudents(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Students').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetStudentMentors(StudentID: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Students/' + StudentID + '/Mentors').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetModuleProgress(StudentID: string, Details: boolean): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Students/' + StudentID + '/ModuleProgress', { params: new HttpParams().append("Details", Details) }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetOverallProgress(StudentID: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Students/' + StudentID + '/Progress').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public SaveStudentMentors(StudentID: string, Mentors: Role[]): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Students/' + StudentID + '/Mentors', JSON.stringify(Mentors), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  public GetStudentMentorIds(StudentID: string): Promise<string[]> {
    return new Promise<string[]>(resolve => {
      this.http.get(this.apiUrl + '/Students/' + StudentID + '/Mentors').subscribe((data: any) => {
        // Assuming the response data is an array of mentor objects with IDs
        const mentorIds: string[] = data.map((mentor: any) => mentor.id);
        resolve(mentorIds);
      }, error => {
        resolve([]);
      });
    });
  }

  public GetStudent(StudentID: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Students/' + StudentID).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public UpdateStudent(student: any): Promise<any> {
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/Students/Update', JSON.stringify(student), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }
}

