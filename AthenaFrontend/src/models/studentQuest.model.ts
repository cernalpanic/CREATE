export class StudentQuest {
    StudentID: string;
    QuestID: string;
    ModuleID: string;
    Name: string;
    Description: string;
    ExpGain: any;
    Available?: boolean;
    Completed: boolean;
    LastActivityDate: Date;

    constructor(studentQuest: any) {
      if (studentQuest.QuestID || studentQuest.questID){
        this.StudentID = studentQuest.StudentID || studentQuest.studentID;
        this.QuestID = studentQuest.QuestID || studentQuest.questID;
        this.ModuleID = studentQuest.ModuleID || studentQuest.moduleID;
        this.Name = studentQuest.Name || studentQuest.name;
        this.Description = studentQuest.Description || studentQuest.description;
        this.ExpGain = studentQuest.ExpGain || studentQuest.expGain;
        this.Available = studentQuest.available || studentQuest.Available;
        this.Completed = studentQuest.Completed || studentQuest.completed;
        this.LastActivityDate = studentQuest.LastActivityDate || studentQuest.lastActivityDate;
      } else {
        this.StudentID = '00000000-0000-0000-0000-000000000000';
        this.QuestID = '00000000-0000-0000-0000-000000000000';
        this.ModuleID = '00000000-0000-0000-0000-000000000000';
        this.Name = '';
        this.Description = '';
        this.ExpGain = '';
        this.Available = false;
        this.Completed = false;
        this.LastActivityDate = new Date();
      }

    }
  }
