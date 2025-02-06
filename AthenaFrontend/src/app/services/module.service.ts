import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl: any;
  private postHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  public AddModule(module: any): Promise<any> {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/Modules', JSON.stringify(module), { headers: this.postHeaders }).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public DeleteModule(moduleId: number): Promise<any> {
    return new Promise(resolve => {
      this.http.delete(this.apiUrl + '/Modules/' + moduleId).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetAllModules(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Modules').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetModule(ModuleID: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Modules/' + ModuleID).subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public GetModuleStudentTotal(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/Modules/StudentTotal').subscribe((data: any) => {
        resolve(data);
      }, error => {
        resolve(false);
      });
    });
  }

  public UpdateModule(updatedModule: any): Promise<any> {
    return new Promise(resolve => {
      this.http.put(this.apiUrl + '/Modules/' + updatedModule.ModuleID, JSON.stringify(updatedModule), {headers: this.postHeaders}).subscribe((data: any) => {
      resolve(data);
    }, error => {
      resolve(false);
    });
    });
  }

}
