import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleService } from 'src/app/services/module.service';
import { Module } from 'src/models/module';
import { Quest } from 'src/models/quest';
import { StudentQuest } from 'src/models/studentQuest.model';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestDialogComponent } from './add-quest-dialog/add-quest-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestService } from 'src/app/services/quest.service';
import { EditQuestDialogComponent } from './edit-quest-dialog/edit-quest-dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthToken } from 'src/models/authtoken.model';
import { Student } from 'src/models/student.model';
import { Mentor } from 'src/models/mentor.model';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { EditModuleDialog } from '../edit-module-dialog/edit-module-dialog';

@Component({
  selector: 'app-inner-module',
  templateUrl: './inner-module.component.html',
  styleUrls: ['./inner-module.component.css'],
})
export class InnerModuleComponent {
  public module: any;
  public receiveQuests: Quest[] = [];
  public quests: Quest[] = [];
  private allStudentQuestCompletion: StudentQuest[] = [];
  private moduleStudentQuest: StudentQuest[] = [];
  protected studentCompleteQuests: StudentQuest[] = [];
  protected studentIncompleteQuests: StudentQuest[] = [];
  protected mentorUnpostedQuests: Quest[] = [];
  protected mentorPostedQuests: Quest[] = [];
  public role: any;
  private auth: any;
  moduleID!: string;
  decodedToken: any;
  protected numTotalQuests: number = 0;
  protected numCompletedQuests: number = 0;
  protected totalExp: number = 0;
  protected currentExp: number = 0;
  public allPostedQuests: Quest[] = [];
  public allUnpostedQuests: Quest[] = [];
  protected totalEarnedExp: number = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public moduleService: ModuleService,
    public questService: QuestService,
    public snackbar: MatSnackBar,
    public authService: AuthService
  , public breadcrumb: BreadcrumbService
    ) {
      this.initialize();
      const navigation = this.router.getCurrentNavigation();
      const state = navigation?.extras.state as {
        module: Module
      };
      this.module = state.module;
      const pageName: string = this.module.Name + ' Module';
      breadcrumb.makeCurrentPage(pageName, router.url, state);
      breadcrumb.setPrevPages();
  }

  public async initialize() {
    const response = await this.authService.getAuthentication();
    const auth = new AuthToken(response);
    this.role = auth.Role;
    if (this.role.Name == 'Student') {
      this.role.Person = new Student(this.role.Person);
    } else if (this.role.Name == 'Mentor') {
      this.role.Person = new Mentor(this.role.Person);
    }
  }

  private async getAuthentication(): Promise<AuthToken> {
    return await this.authService.getAuthentication();
  }

  async loadQuestsWithStatus() {
    try {
      const response = await this.questService.GetAllQuestsWithStatus(this.module.ModuleID);
      this.allPostedQuests = response.posted;
      this.allUnpostedQuests = response.unposted;

      this.mentorPostedQuests = this.allPostedQuests.filter(
        (quest) => quest.ModuleID === this.module.ModuleID
      )

      this.mentorUnpostedQuests = this.allUnpostedQuests.filter(
        (quest) => quest.ModuleID === this.module.ModuleID
      )

      

    } catch (error) {
      console.error('An error occurred while fetching quests', error);
    }
  }

  async ngOnInit() {
    await this.initialize();
    await this.loadQuestsWithStatus();
    const response = await this.getAuthentication();
    this.auth = new AuthToken(response);
    this.role = this.auth.Role;

    try {
      const allQuests = await this.questService.GetAllQuests();
      if (allQuests) {
        this.receiveQuests = allQuests.map(
          (quest: {
            questID: any;
            name: any;
            description: any;
            expGain: any;
            moduleID: any;
          }) =>
            new Quest({
              QuestID: quest.questID,
              Name: quest.name,
              Description: quest.description,
              ExpGain: quest.expGain,
              ModuleID: quest.moduleID,
            })
        );
        this.filterQuests();
      } else {
        console.error('Failed to fetch quests');
      }
    } catch (error) {
      console.error('An error occurred while fetching quests', error);
    }
  }

  

  //test method for testing
  updateAvailability(questID: string, available: boolean) {
    this.questService.updateQuestAvailability(questID, available).subscribe({
      next: (response) => {
        console.log('Response:', response);
        // Handle the response as needed
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  filterQuests() {
    if(this.role.Name == 'Student'){
      this.studentFilterQuests();
    }
    if(this.role.Name == 'Mentor')
      {
        this.mentorFilterQuests();
      }
  }

  async calculateTotalEarnedExp() {
    try {
      const studentQuests = await this.questService.GetStudentQuestCompletion('00000000-0000-0000-0000-000000000000', this.module.ModuleID);
      if (studentQuests) {
        this.moduleStudentQuest = studentQuests.map((studentQuest: any) => new StudentQuest(studentQuest));
        const completedQuests = this.moduleStudentQuest.filter(quest => quest.Completed);
        console.log("All module's completed quests: ", completedQuests)
        this.totalEarnedExp = completedQuests.reduce((acc, quest) => acc + quest.ExpGain, 0);
      } else {
        console.error('Failed to fetch quest completion for student');
      }
    } catch (error) {
      console.error('An error occurred while fetching quest completion for student', error);
    }
  }

  mentorFilterQuests(){
    this.calculateTotalEarnedExp();
  }

  UpdateStudentVariables(){
    this.numTotalQuests = this.mentorPostedQuests.length;
    this.numCompletedQuests = this.studentCompleteQuests.length;
  }

/**
 * Asynchronously filters and categorizes quests based on their completion status
 * for a specific student. This method does the following:
 *
 * 1. Fetches all quest completion records as `StudentQuest` objects for the student identified by their student ID.
 * 2. Maps the received data to instances of `StudentQuest` and stores them in `this.allStudentQuestCompletion`.
 * 3. Iterates over all `allStudentQuestcompletion` and categorizes each quest into either `studentCompleteQuests` or `studentIncompleteQuests`
 *    based on the completion status found in `allStudentQuestCompletion`.
 *
 */
  private async studentFilterQuests() {

    //populating array of all quest completion details of this particular student
    try {
      const studentQuests = await this.questService.GetStudentQuestCompletion(this.role.RoleID, this.module.ModuleID);
      if (studentQuests) {
        this.allStudentQuestCompletion = studentQuests.map((studentQuest: any) =>
          new StudentQuest(studentQuest));
      } else {
        console.error('Failed to fetch quest completion for student');
      }
    } catch (error) {
      console.error('An error occurred while fetching quest completion for student', error);
    }

    //filtering completed and incomplete quests
    this.allStudentQuestCompletion.forEach(quest => {
      if (quest.Completed){
        this.totalExp += quest.ExpGain;
        this.currentExp += quest.ExpGain;
        this.studentCompleteQuests.push(quest);
      } else {
        this.totalExp += quest.ExpGain;
        this.studentIncompleteQuests.push(quest);
      }
    });
    this.UpdateStudentVariables();
  }


  public getImgLink(name: string) {
    return '../../../../assets/images/' + name.toLowerCase() + 'logo.png';
  }

  public getRGBA(hex: string, opacity: number): string {
    const conv = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    const result = {
      r: parseInt(conv[1], 16),
      g: parseInt(conv[2], 16),
      b: parseInt(conv[3], 16),
    };
    return (
      'rgba(' +
      result.r +
      ', ' +
      result.g +
      ', ' +
      result.b +
      ', 0.' +
      opacity +
      ')'
    );
  }

  public addQuest(): void {
    const dialogRef = this.dialog.open(AddQuestDialogComponent, {
      panelClass: 'custom-dialog',
      //passing data to child dialog component
      data: { moduleID: this.module.ModuleID },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        let quest = new Quest(response);
        //quest to be unposted by default on adding
        this.mentorUnpostedQuests.push(quest);
        this.snackbar.open('Quest successfully added!', '', { duration: 3000 });
      }
    });
  }

  public editQuest(quest: Quest, index: number): void {
    const dialogRef = this.dialog.open(EditQuestDialogComponent, {
      panelClass: 'custom-dialog',
      data: { quest: quest },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        let newQuest = new Quest(response);
        if(quest.Available){
          this.mentorPostedQuests.splice(index, 1, newQuest);
        } else {
          this.mentorUnpostedQuests.splice(index, 1, newQuest);
        }
        this.snackbar.open('Quest successfully updated!', '', {
          duration: 3000,
        });
        this.loadQuestsWithStatus();
      } else {
        this.loadQuestsWithStatus();
      }
    });
  }

  public editModule(module: Module): void {
    const dialogRef = this.dialog.open(EditModuleDialog, {
      panelClass: 'custom-dialog',
      data: { module: module },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        let updModule = new Module(response);
        this.module = updModule;
        this.snackbar.open('Module successfully updated!', '', {
          duration: 3000,
        });
      }
    });
  }
}
