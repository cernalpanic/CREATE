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

    //Returns all general katas
    public GetKatas(): Promise<any> {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/Katas').subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    //Returns all katas related to the Student
    public GetStudentKatas(studentID: any): Promise<any> {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/Katas/StudentKata' + studentID).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    //Returns all student katas
    public GetAllStudentKatas(): Promise<any> {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/Katas/AllStudentKatas').subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    //Updates a general kata
    public UpdateKata(kataID: any, description: string, dateAssigned: any, kataName: string): Promise<any> {
        const data = { kataID: kataID, description: description, dateAssigned: dateAssigned, kataName: kataName };

        return new Promise(resolve => {
            this.http.put(this.apiUrl + '/Katas/Update', data).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    //Updates a student's kata
    public UpdateStudentKata(kataID: any, studentID: any, complete: boolean, completionTime: string, studentCode: string, studentNotes: string, adminFeedback: string): Promise<any> {
        const data = { KataID: kataID, StudentID: studentID, Complete: complete, CompletionTime: completionTime, StudentCode: studentCode, StudentNotes: studentNotes, AdminFeedback: adminFeedback };
        return new Promise(resolve => {
            this.http.put(this.apiUrl + '/Katas/UpdateStudentKata', data).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    //Adds a new general Kata
    public AddKata(name: any, description: any): Promise<any> {
        const data = { Description: description, KataName: name };
        console.log(data);
        return new Promise(resolve => {
            this.http.post(this.apiUrl + '/Katas/CreateKata', data).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

    //Adds a student kata
    public AddStudentKata(studentID: any, kataID: any): Promise<any> {
        const data = { KataID: kataID, StudentID: studentID };
        return new Promise(resolve => {
            this.http.post(this.apiUrl + '/Katas/CreateStudentKata', data).subscribe((data: any) => {
                resolve(data);
            }, error => {
                resolve(false);
            });
        });
    }

}
