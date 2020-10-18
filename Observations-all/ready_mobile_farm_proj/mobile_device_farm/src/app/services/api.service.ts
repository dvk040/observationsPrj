import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { StorageService } from "./storage.service";
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  private apiDomain: string = "http://localhost:4000/";
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public apiCall(data) {
    let method = "POST";
    if (data.method) {
      method = data.method;
    }
    const url = this.apiDomain + data.endPoint;
    const contentType = data.contentType || "application/json";
    let userId = this.storageService.getFromLocalStorage("userId") || 1;
    // tslint:disable-next-line:prefer-const

    let h = {
      userId: "1",
      "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
      "mdf-token":"992704"
    };

    const header = {
      headers: new HttpHeaders(h),
    };
    
    if (method == "PUT") {
      return this.http.put(url, data.data, header);
    } else return this.http.post(url, data.data, header);
  }

  public getApiRequest(endPoint: string, options?: any): Observable<any> {
    const url = this.apiDomain + endPoint;
    return this.http.get(url,  options)
  }

  public postApiRequest(endPoint: string , data?: any , options?: any):Observable<any> {
    const url = this.apiDomain + endPoint;
    return this.http.post(url, data, options)
  }

  public putApiRequest(endPoint: string , data?: any , options?: any):Observable<any> {
    const url = this.apiDomain + endPoint;
    return this.http.put( url, data, options)
  }

  public deleteApiRequest(endPoint: string , options?: any):Observable<any> {
    const url = this.apiDomain + endPoint;
    return this.http.delete( url,  options)
  }

}
