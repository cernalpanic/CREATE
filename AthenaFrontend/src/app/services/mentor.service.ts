import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  private apiUrl: any;
  private postHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  // emits changes to mentors' student count
  emitChange(change: any) {
    this.emitChangeSource.next(change);
}

  public AddMentor(mentor: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Mentors', JSON.stringify(mentor), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetAllMentors(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Mentors').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetMentorStudents(mentorID: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Mentors/Students/' + mentorID).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetMentorByID(mentorID: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Mentors/' + mentorID).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }
}
