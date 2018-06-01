import { Person } from '../model/Person';
import { Hospitals } from './hospitals';
export class PatientRegistration {

  id:number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  isdoctor: string;
  ispatient: string;
  password: string;
  person: Person;
  h_id: number;
  speciality: string;
  type: string;
  otp: string;
  userEmail: string;
  fromDate: any;
  toDate: any;

  // constructor(){}

  constructor(id:number, firstname: string, lastname: string, username: string, email: string, phone: string, isdoctor: string, ispatient: string, password: string, person: Person,
    h_id: number, speciality: string, type: string, otp: string, userEmail: string, fromDate: any, toDate: any) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.isdoctor = isdoctor;
    this.ispatient = ispatient;
    this.password = password;
    this.person = person;
    this.h_id = h_id;
    this.speciality = speciality;
    this.type = type;
    this.otp = otp;
    this.userEmail = userEmail;
    this.fromDate = fromDate;
    this.toDate = toDate;

  }

  // firstname: string;
  //  lastname: string;
  //  email: string;
  //  password: string;
  // ispatient: string;
  // isdoctor: string;
  // phone: string;


  // person:Person;
  //  constructor(phone: string, ispatient: string, isdoctor: string, firstname: string, lastname: string, password: string, email: string){
  //       this.firstname =firstname;
  //       this.lastname=lastname;
  //       this.email = email;
  //       this.password = password;
  //       this.ispatient= ispatient;
  //       this.isdoctor=isdoctor;
  //       this.phone = phone;

  //     }
}