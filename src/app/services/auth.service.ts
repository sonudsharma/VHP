import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, Response } from '@angular/http';
import { PatientRegistration } from '../model/PatientRegistration';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class AuthService {
  private id;
  baseUrl: 'http://localhost:8080/email2sms/';
  loggedIn: boolean;
  constructor(private http: HttpClient) {
    // console.log("Auth Service Started");
  }

  attemptAuth(uname: string, pwd: string, userType: string): Observable<any> {
    const credentials = { username: uname, password: pwd, type:userType };
    // console.log('attempAuth ::');
    this.loggedIn = true;
    return this.http.post<any>('/AuroniaService/user/auth/token', credentials)
      .map((response: Response) => response)
      .catch((err) => {
        return Observable.throw(err);
      });
    //console.log(response.json())
  }

  forgotPassword(PatientRegistration: PatientRegistration): Observable<any> {
    // const credentials = {PatientRegistration: PatientRegistration};
    //console.log(credentials);
    return this.http.post<any>('/AuroniaService/user/sendOtp', PatientRegistration)
      .map((response: Response) => response)
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  forgotPassword1(email: any): Observable<any> {
    const credentials = { email: email };

    return this.http.post<any>('/AuroniaService/user/sendOtp', credentials)
      .map((response: Response) => response)
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  reset(PatientRegistration: PatientRegistration): Observable<any> {
    //const credentials = {email: email,otp:otp,password:password};
    //const credentials = {username: email, otp: otp, password: pwd};
    return this.http.post<any>('/AuroniaService/user/resetPassword', PatientRegistration)
      .map((response: Response) => response)
      .catch((err) => {
        return Observable.throw(err);
      });
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

}
