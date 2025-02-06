import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { StudentQuest } from 'src/models/studentQuest.model';
import { Quest } from 'src/models/quest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestService {
  private apiUrl: any;
  private postHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private quests: Quest[] = [];
  constructor(private http: HttpClient) { this.apiUrl = environment.apiUrl; }

  public AddQuest(quest: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Quests', JSON.stringify(quest), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      })
    })
  }

  public GetAllQuests(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Quests').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetAllQuestsWithStatus(moduleID: string): Promise<{posted: Quest[], unposted: Quest[]}> {
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(this.apiUrl + `/Quests/WithStatus/${moduleID}`).subscribe((data: any[]) => {
        if(data){
          this.quests = data.map(
            (quest: {
              questID: any;
              name: any;
              description: any;
              expGain: any;
              moduleID: any;
              available: boolean;
            }) =>
              new Quest({
                QuestID: quest.questID,
                Name: quest.name,
                Description: quest.description,
                ExpGain: quest.expGain,
                ModuleID: quest.moduleID,
                Available: quest.available
              })
          );
          const posted = this.quests.filter(quest => quest.Available);
          const unposted = this.quests.filter(quest => !quest.Available);
          resolve({ posted, unposted });
        } else {
          reject('No data received from API or data format is incorrect.');
        }
      }, error => {
        resolve(error);
      });
    });
  }

  public updateQuestAvailability(questID: string, available: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/Quests/UpdateQuestAvailability/${questID}`, null, {
      params: { available: available.toString() }
    });
  }

  public UpdateQuestCompletion(studentQuest : StudentQuest){
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Students/UpdateStudentQuest', JSON.stringify(studentQuest), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      })
    })
  }

  public GetStudentQuestCompletion(studentId: string, moduleID: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.apiUrl}/Students/GetStudentQuests/${studentId}/${moduleID}`).subscribe((data: any) => {
        resolve(data);
      }, error => {
        console.error('Failed to fetch student quests', error);
        resolve(false);
      });
    });
  }

  public GetQuestById(QuestId: number): Promise<any> {
    return new Promise(resolve => {
      this.http.get(`${this.apiUrl}/Quests/${QuestId}`).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public SaveQuest(updatedQuest: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Quests/SaveQuest', JSON.stringify(updatedQuest), {headers: this.postHeaders}).subscribe((data: any) => {
      resolve(data);
    }, error => {
      resolve(false);
    });
    });
  }

  public DeleteQuest(QuestId: number): Promise<any> {
    return new Promise(resolve => {
      this.http.delete('${this.apiUrl}/Quests/${QuestId}').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }
}
