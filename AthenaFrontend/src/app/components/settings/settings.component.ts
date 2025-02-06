import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/models/role.model';
import { debounceTime } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public editing: boolean = false;
  public showPassword: boolean = false;
  public role: Role;
  public settings: any;
  public firstName: FormControl = new FormControl('', [Validators.required]);
  public lastName: FormControl = new FormControl('', [Validators.required]);
  public email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  public availability: FormControl = new FormControl('');
  public jobTitle: FormControl = new FormControl('');
  public password: FormControl = new FormControl('');
  public imageURL: FormControl = new FormControl('');

  constructor(public userService: UserService, public router: Router, public snackbar: MatSnackBar, public authService: AuthService, public breadcrumb: BreadcrumbService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      role: Role
    };
    this.role = state.role;
    const current = {
      FirstName: this.role.Person.FirstName,
      LastName: this.role.Person.LastName,
      Email: this.role.Person.Email,
      ImageURL: '',
      Availability: this.role.Person.Availability,
      JobTitle: this.role.Person.JobTitle
    };
    this.settings = current;
    this.getSettings();

    const pageName: string = 'Settings';
    breadcrumb.makeCurrentPage(pageName, router.url, state);
    breadcrumb.setPrevPages();
  }

  private async checkEmail(email: any): Promise<boolean> {
    return await this.userService.CheckEmail(email);
  }

  public async getSettings() {
    const response = await this.userService.GetUserSettings(this.role.RoleID);
    if (response) {
      this.firstName.setValue(response.FirstName);
      this.lastName.setValue(response.LastName);
      this.email.setValue(response.Email);
      this.availability.setValue(response.Availability);
      this.imageURL.setValue(response.ImageURL);
      this.jobTitle.setValue(response.JobTitle);
      this.settings.ImageURL = response.ImageURL;
    }
  }

  public editSettings() {
    this.editing = true;
  }

  public ngOnInit(): void {
    // Subscribe to changes to the email value to show feedback of whether email is valid
    this.email.valueChanges.pipe(debounceTime(1000)).subscribe(async email => {
      const emailInUse = document.querySelector('#validationServer01Feedback') as HTMLElement;
      const emailValid = document.querySelector('#validationServer02Feedback')! as HTMLElement;
      const submitButton = document.querySelector('#submit') as HTMLButtonElement;
      if (this.email.valid){
        emailValid.style.display = 'none';
        const inUse = await this.checkEmail(email);
        if (inUse == true && this.email.value != this.settings.Email){
          emailInUse.style.display = 'block';
          submitButton.disabled = true;
        } else {
          emailInUse.style.display = 'none';
          submitButton.disabled = false;
        }
      } else {
        submitButton.disabled = true;
        emailInUse.style.display = 'none';
        emailValid.style.display = 'block';
      }
    });
  }

  public async saveSettings() {
    const updated = {
      FirstName: this.firstName.value,
      LastName: this.lastName.value,
      Email: this.email.value,
      Availability: this.availability.value,
      JobTitle: this.jobTitle.value ?? '',
      ImageURL: this.imageURL.value,
      Password: this.password.value
    };
    const response = await this.userService.UpdateUserSettings(this.role.RoleID, updated);
    if (response){
      this.settings.FirstName = updated.FirstName;
      this.settings.LastName = updated.LastName;
      this.settings.Email = updated.Email;
      this.settings.ImageURL = updated.ImageURL;
      this.settings.Availability = updated.Availability;
      this.settings.JobTitle = updated.JobTitle;
      this.password.setValue('');   // Reset password value for security

      this.snackbar.open('Settings successfully updated!', '', { duration: 3000 });
    } else {
      this.snackbar.open('Something went wrong.', '', { duration: 3000 });
    }
    this.editing = false;
    this.authService.auth = null;
    const auth = await this.authService.getAuthentication();
    this.authService.emitChange(auth);
  }

  public toggleEdit() {
    this.editing = !this.editing;
  }

  public toggleHidePassword(): void {
    this.showPassword = !this.showPassword;
    const el = document.getElementById('show-hide') as HTMLElement;
    const input = document.querySelector('#validationServer04') as HTMLInputElement;
    if (this.showPassword) {
      el.innerHTML = '<i class="bi bi-eye"></i>';
      input.type = 'text';
    } else {
      el.innerHTML = '<i class="bi bi-eye-slash"></i>';
      input.type = 'password';
    }
  }
}
