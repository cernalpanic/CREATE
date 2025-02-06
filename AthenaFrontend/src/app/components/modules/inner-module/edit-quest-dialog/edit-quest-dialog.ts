import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QuestService } from 'src/app/services/quest.service';
import { Quest } from 'src/models/quest';
import { firstValueFrom } from 'rxjs';

export interface QuestData {
  Name: string;
  Description: string;
  ExpGain: string;
}

@Component({
  selector: 'app-edit-quest-dialog',
  templateUrl: './edit-quest-dialog.html',
  styleUrls: ['./edit-quest-dialog.css']
})
export class EditQuestDialogComponent {
  public quest: Quest;
  public name = new FormControl('', [Validators.required]);
  public description = new FormControl('', [Validators.required]);
  public expGain = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<EditQuestDialogComponent>, public questService: QuestService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.quest = this.data.quest;
    console.log("Edit dialog quest availability: ", this.quest.Available)
    this.name.setValue(this.quest.Name);
    this.description.setValue(this.quest.Description);
    this.expGain.setValue(this.quest.ExpGain);
  }

  async toggleQuestAvailability(): Promise<any> {
    try {
      const available = !this.quest.Available;  // Toggle the current state
      const response = await firstValueFrom(this.questService.updateQuestAvailability(this.quest.QuestID, available));
      this.quest.Available = available;
      console.log(`Quest availability updated successfully to ${available}.`, response);
      this.dialogRef.close();
    } catch (error) {
      console.error("Error updating quest availability.", error);
      this.dialogRef.close();
    }
  }

  public async saveQuest(): Promise<any> {
    const quest = {
      QuestID: this.quest.QuestID,
      ModuleID: this.quest.ModuleID,
      Name: this.name.value,
      Description: this.description.value,
      ExpGain: this.expGain.value,
    };
    const response = await this.questService.SaveQuest(quest);
    if (response){
      this.dialogRef.close(quest);
    }
  }
}
