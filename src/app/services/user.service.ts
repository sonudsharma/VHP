import { Injectable } from '@angular/core';
import { PatientRegistration } from '../model/PatientRegistration';
import { Document } from '../model/Document';
import { Hospitals } from '../model/hospitals';
import {
  HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TokenStorage } from './token.storage';

@Injectable()
export class UserService {
  private Register = '/AuroniaService/user/register';
  private apiUrl1 = '/AuroniaService/person';
  private deletePerson = '/AuroniaService/user/delete';
  private apiUrl13 = '/AuroniaService/user/updateProfile';
  private hospitalApi = '/AuroniaService/hospital';
  private doctorApi = '/AuroniaService/user/doctorList';
  private personApi = '/AuroniaService/person';
  private document = '/AuroniaService/fileupload';
  private patientApi = '/AuroniaService/user/patientList';
  private patientListreport = '/AuroniaService/user/patientListReport';
  private cityApi = '/AuroniaService/cityList';
  private stateApi = '/AuroniaService/stateList';
  private countryApi = '/AuroniaService/countryList';
  private specialityApi = '/AuroniaService/specialist';
  private mediaTypeApi = '/AuroniaService/mediaTypeList';
  private mediaCategoryApi = '/AuroniaService/mediatype/{category}';
  private appoitmentList1 = '/AuroniaService/appoinmentList';
  private appoitment = '/AuroniaService/appoinmentList';
  private logoutApi = '/AuroniaService/user/logout';
  private chatBar = '/AuroniaService/GetDoctorsMsgCountChartData';
  private id;
  constructor(private http: HttpClient,
    private token: TokenStorage) {
    // console.log("User Service Started");
  }

  public check() {
    // console.log(this.token.getToken());
    if (this.token.getToken() != null) {
      this.messageSource.next(true);
    }
  }
  public loggedIn: boolean;

  private idSource = new BehaviorSubject<number>(null);
  currentId = this.idSource.asObservable();


  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();

  private typeSource = new BehaviorSubject<string>("");
  currentType = this.typeSource.asObservable();

  private nameSource = new BehaviorSubject<string>("");
  currentName = this.nameSource.asObservable();

  private emailSource = new BehaviorSubject<string>("");
  currentEmail = this.emailSource.asObservable();

  create(PatientRegistration: PatientRegistration) {

    return this.http.post<any>(this.Register, PatientRegistration);
  }

  public getUsers(): Observable<PatientRegistration[]> {

    return this.http.get<PatientRegistration[]>(this.apiUrl1);
  }

  public getUser(id: number): Observable<PatientRegistration> {

    return this.http.get<PatientRegistration>(this.apiUrl1 + '/' + id);
  }

  public getUser1(id: string): Observable<PatientRegistration> {

    return this.http.get<PatientRegistration>(this.apiUrl1 + '/' + id);
  }

  public logout(id: number): Observable<PatientRegistration> {

    return this.http.get<PatientRegistration>(this.logoutApi + '/' + id);
  }

  public deleteUser(id: number): Observable<PatientRegistration> {

    return this.http.delete<any>(this.deletePerson + '/' + id);
  }

  public updateUser(user: any, id: number): Observable<any> {
    return this.http.put<any>(this.apiUrl13, user);
  }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  changeId(id: number) {
    this.idSource.next(id);
  }

  changeType(type: string) {
    this.typeSource.next(type);
  }

  changeName(name: string) {
    this.nameSource.next(name);
  }

  changeEmail(email: string) {
    this.emailSource.next(email);
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  hospitalList(): Observable<Hospitals[]> {
    return this.http.get<Hospitals[]>(this.hospitalApi);
  }

  public getHospital(id: Number): Observable<Hospitals[]> {
    return this.http.get<Hospitals[]>(this.hospitalApi + '/' + id);
  }

  doctorList(): Observable<any> {
    return this.http.get<any>(this.doctorApi);
  }

  patientList(): Observable<any> {
    return this.http.get<any>(this.patientApi);
  }

  googleChatBar(): Observable<any> {
    return this.http.get<any>(this.chatBar);
  }

  // patientListReport(fromDate,toDate): Observable<any> {
  // return this.http.post<any>(this.patientListreport,'{"fromDate":"'+fromDate+'","toDate":"'+toDate+'"}');
  // }


  patientListReport(user: any): Observable<any> {
    return this.http.post<any>(this.patientListreport, user);
    }
  

  specialityList(): Observable<any> {
    return this.http.get<any>(this.specialityApi);
  }

  mediaTypeList(): Observable<any> {
    return this.http.get<any>(this.mediaTypeApi);
  }

  mediaCategoryList(): Observable<any> {
    return this.http.get<any>(this.mediaCategoryApi);
  }

  cityList(): Observable<any> {
    return this.http.get<any>(this.cityApi);
  }

  stateList(): Observable<any> {
    return this.http.get<any>(this.stateApi);
  }

  countryList(): Observable<any> {
    return this.http.get<any>(this.countryApi);
  }

  appoitmentList(): Observable<any> {
    return this.http.get<any>(this.appoitmentList1);
  }

  appoitmentBook(): Observable<any> {
    return this.http.get<any>(this.appoitment);
  }

  findUser(id: number): Observable<any> {
    return this.http.get(this.personApi + '/' + id);
  }

  // updateUser(user: User,id:number):  Observable<User>{
  //   return this.http.put(this.apiUrl4+"/"+id, user);
  // }



  uploadDocument(Document: any, id: string) {
    let _formData = new FormData();
    _formData.append('file', Document);
    _formData.append('userid', id);
    let body = _formData;
    let headers = new Headers();
    var options = { content: _formData };
    let header = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/*' })
    };
    return this.http.post<any>(this.document, _formData);
  }
}