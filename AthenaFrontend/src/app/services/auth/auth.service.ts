import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { AuthToken } from 'src/models/authtoken.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: any;
  public token: any = localStorage.getItem('token')?.toString();
  public auth: any;
  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  public isAuthenticated(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.http.get(this.apiUrl + '/Users/Auth/Check/' + this.token).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public getAuthentication(): Promise<AuthToken> {
    if (this.auth == undefined || this.auth == null) {
      return new Promise<AuthToken>(resolve => {
        this.http.get(this.apiUrl + '/Users/Auth/' + this.token).subscribe((data: any) => {
          this.auth = data;
          resolve(data);
        }, error => {
          resolve(new AuthToken(null));
        });
      });
    } else {
      return this.auth;
    }
  }
}
