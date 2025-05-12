import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Module } from 'src/models/module';
import { Quest } from 'src/models/quest';
import { QuestService } from 'src/app/services/quest.service';

@Component({
  selector: 'app-module-card',
  templateUrl: './module-card.component.html',
  styleUrls: ['./module-card.component.css'],
})
export class ModuleCardComponent {
  @Input() modules: Module[] = [];
  @Input() role: any;
  public quests: Quest[] = [];
  protected allPostedQuests: Quest[] = [];
  protected mentorPostedQuests: Quest[] = [];

  constructor(
    private authService: AuthService,
    public questService: QuestService
  ) {}

  public getImgLink(name: string) {
    return '../../../../assets/images/' + name.toLowerCase() + 'logo.png';
  }

  async loadQuestsWithStatus() {
    try {
      const response = await this.questService.GetAllQuestsWithStatus(
        this.modules[0].ModuleID
      );
      this.allPostedQuests = response.posted;

      this.mentorPostedQuests = this.allPostedQuests.filter(
        (quest) => quest.ModuleID === this.modules[0].ModuleID
      );
    } catch (error) {
      console.error('An error occurred while fetching quests', error);
    }
  }

  async ngOnInit() {
    await this.loadQuestsWithStatus();
  }
}
