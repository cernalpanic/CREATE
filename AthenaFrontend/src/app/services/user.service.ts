import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: any;
  public isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn')) ?? false;
  private postHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public auth: any = sessionStorage.getItem('auth')?.toString();

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.apiUrl;
  }

  public CheckEmail(email: string): Promise<boolean> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Users/Email/' + email).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public Login(): void {
    this.isLoggedIn = true;
  }

  public CheckLogin(login: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Users/CheckLogin',  JSON.stringify(login), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      })
    })
  }

  public GetUserSettings(roleID: any): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Users/' + roleID + '/Settings').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public LoginUser(loginData: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Users/Login', JSON.stringify(loginData), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public UpdateUserSettings(roleID: string, settings: any): Promise<any> {
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/Users/' + roleID + '/Settings', JSON.stringify(settings), {headers: this.postHeaders}).subscribe((data: any) => {
      resolve(data);
    }, error => {
      resolve(false);
    });
    });
  }

}
