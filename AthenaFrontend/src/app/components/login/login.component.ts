import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthToken } from 'src/models/authtoken.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email = new FormControl('', [Validators.email, Validators.required]);
  public password = new FormControl('', [Validators.required]);
  public errorMessage: string = '';
  public emailErrorMessage = '';
  public passwordErrorMessage = '';

  constructor(public userService: UserService, public router: Router) {}

  public async login(): Promise<void> {
    // reset error msgs
    this.errorMessage = '';
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';

    if (!this.email.valid) {
      this.emailErrorMessage = 'Please enter a valid email';
    }

    if(!this.password.valid) {
      this.passwordErrorMessage = 'Please enter a valid password';
    }

    if (this.email.valid && this.password.valid){
      const loginData = {
        Email: this.email.value,
        Password: this.password.value
      };
      const response = await this.loginUser(loginData);
      if (response != null && response != undefined) {
        this.errorMessage = 'Incorrect username or password';
        let token = new AuthToken(response);
        localStorage.setItem('token', token.TokenID);
        this.router.navigate(['/dashboard']);
        location.reload();
      }
    }
  }

  public async loginUser(loginData: any): Promise<any> {
    return await this.userService.LoginUser(loginData);
  }

}
