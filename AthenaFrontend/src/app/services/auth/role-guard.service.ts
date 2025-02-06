import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthToken } from 'src/models/authtoken.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  public async canActivate(): Promise<boolean> {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      auth: AuthToken,
      expectedRole: string
    };

    if (
      !this.auth.isAuthenticated() ||
      state.auth.Role.Name !== state.expectedRole
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
