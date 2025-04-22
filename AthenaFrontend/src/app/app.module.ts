import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { StudentsPageComponent } from './components/students-page/students-page.component';
import { AuthGuardService as AuthGuard } from './services/auth/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/auth/role-guard.service';
import { StudentCardComponent } from './components/students-page/student-card/student-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddStudentDialog } from './components/students-page/add-student-dialog/add-student-dialog';
import { ViewStudentDialog } from './components/students-page/view-student-dialog/view-student-dialog';
import { ModulesComponent } from './components/modules/modules.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddMentorDialog } from './components/dashboard/add-mentor-dialog/add-mentor-dialog';
import { AddModuleDialog } from './components/modules/add-module-dialog/add-module-dialog';
import { EditModuleDialog } from './components/modules/edit-module-dialog/edit-module-dialog';
import { InnerModuleComponent } from './components/modules/inner-module/inner-module.component';
import { ModuleCardComponent } from './components/modules/module-card/module-card.component';
import { DailyStandupComponent } from './components/daily-standup/daily-standup.component';
import { DailyStandupCardComponent } from './components/daily-standup/daily-standup-card/daily-standup-card.component';
import { AddQuestDialogComponent } from './components/modules/inner-module/add-quest-dialog/add-quest-dialog.component';
import { QuestsComponent } from './components/modules/inner-module/quests/quests.component';
import { EditQuestDialogComponent } from './components/modules/inner-module/edit-quest-dialog/edit-quest-dialog';
import { StudentDashMentorCardComponent } from './components/dashboard/student-dash-mentor-card/student-dash-mentor-card.component';
import { EditDailyStandupComponent } from './components/daily-standup/edit-daily-standup/edit-daily-standup.component';
import { ViewStudentStandupsComponent } from './components/students-page/view-student-dialog/view-student-standups/view-student-standups.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ModuleProgressComponent } from './components/students-page/student-card/module-progress/module-progress.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ModuleDashCardComponent } from './components/dashboard/module-dash-card/module-dash-card.component';
import { CodeKataComponent } from './components/code-kata/code-kata.component';

const ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentsPageComponent, canActivate: [RoleGuard] },
  { path: 'students/:StudentName', component: ViewStudentDialog, canActivate: [RoleGuard] },
  {
    path: 'code-kata',
    component: CodeKataComponent,
    canActivate: [AuthGuard], //Set to role guard when working
  },
  { path: 'modules', component: ModulesComponent, canActivate: [AuthGuard] },
  {
    path: 'modules/:ModuleID',
    component: InnerModuleComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'quests/:QuestID',
    component: QuestsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  //{ path: 'edit-daily-standup', component: EditDailyStandupComponent, canActivate: [AuthGuard] },
]

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    StudentsPageComponent,
    SettingsComponent,
    ModulesComponent,
    StudentCardComponent,
    AddStudentDialog,
    ViewStudentDialog,
    AddMentorDialog,
    AddModuleDialog,
    EditModuleDialog,
    InnerModuleComponent,
    ModuleCardComponent,
    DailyStandupComponent,
    DailyStandupCardComponent,
    AddQuestDialogComponent,
    EditQuestDialogComponent,
    QuestsComponent,
    BreadcrumbsComponent,
    StudentDashMentorCardComponent,
    EditDailyStandupComponent,
    ViewStudentStandupsComponent,
    ModuleProgressComponent,
    ModuleDashCardComponent,
    CodeKataComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatTableModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      percent: 0,
      radius: 40,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 300,
      animation: true,
      showTitle: true,
      showInnerStroke: false,
      showBackground: false,
    }),
    MatPaginatorModule

  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
