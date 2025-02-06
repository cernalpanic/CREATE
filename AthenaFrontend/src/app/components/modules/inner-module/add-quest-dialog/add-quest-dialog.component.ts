import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestService } from 'src/app/services/quest.service';

export interface QuestData {
  Name: string;
  Description: string;
  ExpGain: string;
}

@Component({
  selector: 'app-add-quest-dialog',
  templateUrl: './add-quest-dialog.component.html',
  styleUrls: ['./add-quest-dialog.component.css']
})
export class AddQuestDialogComponent {
  moduleID!: string;

  setModuleID(id: string){
    this.moduleID = id;
  }

  public showPassword = false;
  public name = new FormControl('', [Validators.required]);
  public description = new FormControl('', [Validators.required]);
  public expGain = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<AddQuestDialogComponent>, public questService: QuestService, @Inject(MAT_DIALOG_DATA) public data: any) {}

  public async addQuest(moduleID: string): Promise<any> {
    this.moduleID = moduleID;

    const quest = {
      ModuleID: moduleID,
      Name: this.name.value,
      Description: this.description.value,
      ExpGain: this.expGain.value,
    };
    const response = await this.questService.AddQuest(quest);
    this.dialogRef.close(response);
  }
}
