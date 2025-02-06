import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuleService } from 'src/app/services/module.service';

export interface ModuleData {
  Name: string;
  Color: string;
  Description: string;
}

@Component({
  selector: 'app-add-module-dialog',
  templateUrl: './add-module-dialog.html',
  styleUrls: ['./add-module-dialog.css']
})
export class AddModuleDialog {
  public name = new FormControl('', [Validators.required]);
  public color = new FormControl('', [Validators.required]);
  public description = new FormControl('');

  constructor(public dialogRef: MatDialogRef<AddModuleDialog>, public moduleService: ModuleService) {}

  public async addModule(): Promise<any> {
    const module = {
      Name: this.name.value,
      Color: this.color.value?.substring(1),
      Description: this.description.value
    };
    const response = await this.moduleService.AddModule(module);
    this.dialogRef.close(response);
  }
}
