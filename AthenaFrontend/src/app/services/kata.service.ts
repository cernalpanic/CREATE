import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class KataService {
    private apiUrl: any;
    private postHeaders: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    private emitChangeSource = new Subject<any>();
    changeEmitted$ = this.emitChangeSource.asObservable();
    constructor(private http: HttpClient) {
        this.apiUrl = environment.apiUrl;
    }

    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    //Returns all katas related to the Student
    public GetStudentKatas(studentID: any): Promise<any> {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/Katas/StudentKatas/' + studentID).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    public UpdateDailyStandup(standupID: any, yesterdayTask: string, todayPlan: string, blockers: string, adminFeedback: string): Promise<any> {
        const data = { standupID: standupID, yesterdayTask: yesterdayTask, todayPlan: todayPlan, blockers: blockers, adminFeedback: adminFeedback };

        return new Promise(resolve => {
            this.http.put(this.apiUrl + '/DailyStandups/Update', data).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    public AddDailyStandup(student: any): Promise<any> {
        return new Promise(resolve => {
            this.http.post(this.apiUrl + '/DailyStandups', JSON.stringify(student), { headers: this.postHeaders }).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

}
