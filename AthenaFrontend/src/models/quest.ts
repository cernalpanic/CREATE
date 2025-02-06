export class Quest {

    QuestID: string;
    ModuleID: string;
    Name: string;
    Description: string;
    ExpGain: any;
    Available?: boolean;

    constructor(quest: any)
    {
      if (quest.QuestID || quest.questID){
        this.QuestID = quest.QuestID || quest.questID;
        this.ModuleID = quest.moduleID || quest.ModuleID;
        this.Name = quest.name || quest.Name;
        this.Description = quest.description || quest.Description;
        this.ExpGain = quest.expGain || quest.ExpGain;
        this.Available = quest.Available || quest.available;
      } else {
        this.QuestID = '00000000-0000-0000-0000-000000000000';
        this.ModuleID = '00000000-0000-0000-0000-000000000000';
        this.Name = '';
        this.Description = '';
        this.ExpGain = '';
      }
    }
}
