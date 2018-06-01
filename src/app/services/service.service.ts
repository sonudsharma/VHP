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

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ServiceService {
  private Register = '/VHPService/AuroniaService/user/register';
  private apiUrl1 = '/VHPService/AuroniaService/person';
  private deletePerson = '/VHPService//AuroniaService/user/delete';
  private apiUrl13 = '/VHPService/AuroniaService/user/updateProfile';
  private hospitalApi = '/VHPService/AuroniaService/hospital';
  private doctorApi = '/VHPService/AuroniaService/user/doctorList';
  private personApi = '/VHPService/AuroniaService/person';
  private document = '/VHPService/AuroniaService/fileupload';
  private patientApi = '/VHPService/AuroniaService/user/patientList';
  private id1;
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
  currenId = this.idSource.asObservable();


  private messageSource = new BehaviorSubject<boolean>(true);
  currentMessage = this.messageSource.asObservable();

  private typeSource = new BehaviorSubject<string>("");
  currentType = this.typeSource.asObservable();

  private nameSource = new BehaviorSubject<string>("");
  currentName = this.nameSource.asObservable();

  private emailSource = new BehaviorSubject<string>("");
  currentEmail = this.emailSource.asObservable();

  create(PatientRegistration: PatientRegistration) {
    console.log("crerate");
    return this.http.post<any>(this.Register, PatientRegistration);
  }

  public getUsers(): Observable<PatientRegistration[]> {

    return this.http.get<PatientRegistration[]>(this.apiUrl1);
  }

  public getUser(id: Number): Observable<PatientRegistration> {
    return this.http.get<PatientRegistration>(this.apiUrl1 + '/' + id);
  }

  public deleteUser(id: number): Observable<PatientRegistration> {

    return this.http.delete<any>(this.deletePerson + '/' + id);
  }

  public updateUser(user: PatientRegistration, id: number): Observable<PatientRegistration> {
    return this.http.put<PatientRegistration>(this.apiUrl13, user);
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

  findAll(): Observable<Hospitals[]> {
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

  findUser(id: number): Observable<any> {
    return this.http.get(this.personApi + '/' + id);
  }

  // updateUser(user: User,id:number):  Observable<User>{
  //   return this.http.put(this.apiUrl4+"/"+id, user);
  // }

  getId() {
    return this.id1;
  }

  setId(id1) {
    this.id1 = id1;
  }

  uploadDocument(Document: File, id: string) {
    //console.log(Document);
    let _formData = new FormData();
    _formData.append("userid", id);
    _formData.append('file', Document);
    console.log(_formData);
    let body = _formData;
    let headers = new Headers();
    var options = { content: _formData };
    let header = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/*' })

    };
    //console.log("crerate");
    //console.log(body);
    return this.http.post<any>(this.document, _formData);
  }


}
