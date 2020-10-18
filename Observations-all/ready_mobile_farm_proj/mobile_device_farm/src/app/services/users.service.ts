import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { LoadingService } from "./loading.service";
import { ApiService } from "./api.service";
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userDetails = new BehaviorSubject({});
  

  constructor(public api: ApiService) { } 
  
  public loginService(data): Observable<any> {
    const headers = 
       new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f"
      })

    return this.api.postApiRequest("login" ,data , { headers: headers, observe: 'response', responseType: 'json'});
    
  }

  public registerService(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }
    return this.api.postApiRequest("registation" ,data , httpOptions)
  }

  public forgotPWDService(data): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f"
      })
    }
    return this.api.postApiRequest("forgotpassword" ,data , httpOptions)
  }

  public changePWDService(data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":"1234-5678-1234"       
      })
    }
    return this.api.postApiRequest("userprofile/password-reset" ,data , httpOptions)
  }  

  public getProfileDetails(userId): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":"1234-5678-1234"       
      }) 
    }
    return this.api.getApiRequest("userprofile/"+ userId, httpOptions)
  }

   public postRegister(data): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":"1234-5678-1234"       
      })
    }
    return this.api.postApiRequest("userprofile",data, httpOptions)
  }

  public profileUpdate(data): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":"1234-5678-1234"       
      })
    }
    return this.api.putApiRequest("userprofile",data, httpOptions)
  }
 
  public getUsersList(data): Observable<any> {
   // return this.api.getApiRequest("assets/loginmodule/userslist.json");
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":"1234-5678-1234"       
      }) 
    }
    if (data.pageNumber > 1 && data.email == '') {
      return this.api.getApiRequest("userprofile?page=" + data.pageNumber, httpOptions);
    } else if (data.pageNumber >= 1 && data.email != '') {
      return this.api.getApiRequest("userprofile?page=" +data.pageNumber+"&email="+data.email , httpOptions);
    } else {
      return this.api.getApiRequest("userprofile", httpOptions);
    }   
  }

  // public searchList(search): Observable<any> { 
  //   console.log(search);  
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json",
  //       "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
  //       "mdf-token":"1234-5678-1234"       
  //     }) 
  //   }
  //     return this.api.getApiRequest("userprofile?page=" +search.pageNumber+"&email="+search.email , httpOptions);
    
  // }

  public deleteUser(bodyData): Observable<any> { 
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token": "1234-5678-1234",
        
      }),
      body:bodyData
    }
    return this.api.deleteApiRequest("userprofile", httpOptions)
  }
  
  public roleDropDown(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":"1234-5678-1234"       
      }) 
    }
    return this.api.getApiRequest("staticinfo", httpOptions)
  }

  // public apiCallTest(): Observable<any> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
  //       "mdf-token":"1234-5678-1234"       
  //     }) 
  //   }
  //   return this.api.getApiRequest("test/create", httpOptions)
  // }
 
  public apiCallTest(data): Observable<any> {  
    const httpOptions = {
      headers: new HttpHeaders({
        userId: "1",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":"1234-5678"       
      })
    }
    return this.api.postApiRequest("test/create", data, httpOptions)
  }
  
  public exicuteTest(reqData): Observable<any> {  
    console.log(reqData)
    const httpOptions = {
      headers: new HttpHeaders({
        userid: reqData.userid,
       // userId: "1",
       // "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":reqData.MDF_TOKEN       
      })
    }
    
    return this.api.postApiRequest(reqData.endPoint, reqData.data, httpOptions)
  }

  public checkProjectTest(reqData): Observable<any> {  
    console.log(reqData)
    const httpOptions = {
      headers: new HttpHeaders({
        "userid": reqData.userid,
        "Content-Type": "application/json",
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":reqData.MDF_TOKEN       
      })
    }   
    return this.api.postApiRequest(reqData.endPoint, reqData.data, httpOptions)
  }
 
  public submitAPKForms(reqData): Observable<any> {  
    console.log(reqData)
    const httpOptions = {
      headers: new HttpHeaders({
        "userId": reqData.userid,
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":reqData.MDF_TOKEN      
      })
    }   
    return this.api.postApiRequest(reqData.endPoint, reqData.data, httpOptions)
  }

  public apkTestList(reqData): Observable<any> {  
    console.log(reqData)
    const httpOptions = {
      headers: new HttpHeaders({
        "userId": reqData.userid,
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":reqData.MDF_TOKEN     
      })
    }   
    return this.api.postApiRequest("tests", reqData.data, httpOptions)
  }
  public apkDownload(reqData): Observable<any> {  
    console.log(reqData)
    const httpOptions = {
      headers: new HttpHeaders({
        "userid": reqData.userid,
        "x-access-key": "271292de-df75-41e3-b42f-59e1624ee98f",
        "mdf-token":reqData.MDF_TOKEN     
      })
    }   
    return this.api.getApiRequest(reqData.endPoint, httpOptions)
  }

  
}
