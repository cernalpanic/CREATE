import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { StudentQuest } from 'src/models/studentQuest.model';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';


export class ModuleProgress {
  public ModuleID: string;
  public Name: string;
  public Color: string;
  public QuestsCompleted: number;
  public QuestsAvailable: number;
  public Progress: number;
  public Quests: StudentQuest[];

  constructor(module: any) {
    this.ModuleID = module.ModuleID;
    this.Name = module.Name;
    this.Color = module.Color;
    this.QuestsCompleted = module.QuestsCompleted ?? 0;
    this.QuestsAvailable = module.QuestsAvailable ?? 0;
    this.Progress = Math.round(this.QuestsCompleted / this.QuestsAvailable * 100) ?? 0;
    this.Quests = [];
  }
}

@Component({
  selector: 'app-module-progress',
  templateUrl: './module-progress.component.html',
  styleUrls: ['./module-progress.component.css']
})
export class ModuleProgressComponent implements OnInit {
  @Input() details: boolean = false;
  @Input() studentID: string = '';
  public modules: ModuleProgress[] = [];
  panelOpenState = false;
  displayedColumns: string[] = ['quest_name', 'completed'];

  //paginator setup
  pageSize = 5; //default page size
  pageIndex = 0; //intial page index
  pageSizeOptions = [5, 10, 15];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  paginatedLower = 0;
  paginatedUpper = 6;

  pageEvent: any;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get lower and upper pagination bounds
    this.paginatedLower = (this.pageIndex * this.pageSize);
    this.paginatedUpper = (this.pageIndex * this.pageSize) + this.pageSize + 1;
  }

  constructor(public studentService: StudentService) { }

  public async getModuleProgress(studentID: string, details: boolean): Promise<ModuleProgress[]> {
    const response = await this.studentService.GetModuleProgress(studentID, details);
    let modules: ModuleProgress[] = [];
    if (response) {
      response.forEach((module: any) => {
        const mod = new ModuleProgress(module);
        if (details) {
          module.Quests.forEach((quest: any) => {
            const q = new StudentQuest(quest);
            mod.Quests.push(q);
          });
        }
        modules.push(mod);
      });

    }
    return modules;
  }

  public async ngOnInit(): Promise<void> {
    this.modules = await this.getModuleProgress(this.studentID, this.details);
  }

}
