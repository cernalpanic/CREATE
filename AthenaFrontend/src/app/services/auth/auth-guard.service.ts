import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  public async canActivate(): Promise<boolean> {
    if (!(await this.auth.isAuthenticated())) {
      this.router.navigate(['/login']);
      console.log(this.router.getCurrentNavigation())
      return false;
    }
    return true;
  }

}
