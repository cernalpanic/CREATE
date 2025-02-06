import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';

export interface ModuleData {
  Name: string;
  Color: string;
  Description: string;
}

@Component({
  selector: 'app-edit-module-dialog',
  templateUrl: './edit-module-dialog.html',
  styleUrls: ['./edit-module-dialog.css']
})
export class EditModuleDialog {
  public name = new FormControl('', [Validators.required]);
  public color = new FormControl('', [Validators.required]);
  public description = new FormControl('');

  constructor(public dialogRef: MatDialogRef<EditModuleDialog>, public moduleService: ModuleService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.name.setValue(data.module.Name);
    this.color.setValue('#' + data.module.Color);
    this.description.setValue(data.module.Description);
  }

  public async addModule(): Promise<any> {
    const module = {
      ModuleID: this.data.module.ModuleID,
      Name: this.name.value,
      Color: this.color.value?.substring(1),
      Description: this.description.value
    };
    const response = await this.moduleService.UpdateModule(module);
    if (response) {
      this.dialogRef.close(module);
    } else {
      this.dialogRef.close(response);
    }
  }
}
