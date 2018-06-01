import { Hospitals } from "./hospitals";
import { Address } from "./Addess";

export class Person {
  firstName: string = '';
  lastName: string = '';
  phone: string;
  email: string;
  gender: string;
  dob: Date;
  speciality: string;
  p_url: string;
  address: Address;
  fullName: string;
  h_id: number;
  height: string;
  weight: string;
  adharnumber: string;
  photourl: string;
  hospital: Hospitals;
  userEmail: string;
  age: string;
  liciencenumber: string;
  tagline: string;

  

  constructor(){

  }
  // constructor(firstName: string, lastName: string, phone: string, email: string, gender: string, dob: Date, speciality: string, p_url: string, address: Address,
  //   fullName: string, h_id: number, height: string, weight: string, adharnumber: string, photourl: string, hospital: Hospitals, userEmail: string, age: string,
  //   liciencenumber: string, tagline: string) {
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.phone = phone;
  //   this.email = email;
  //   this.gender = gender;
  //   this.dob = dob;
  //   this.speciality = speciality;
  //   this.p_url = p_url;
  //   this.address = address;
  //   this.fullName = fullName;
  //   this.h_id = h_id;
  //   this.height = height;
  //   this.weight = weight;
  //   this.adharnumber = adharnumber;
  //   this.photourl = photourl;
  //   this.hospital = hospital;
  //   this.userEmail = userEmail;
  //   this.age = age;
  //   this.liciencenumber = liciencenumber;
  //   this.tagline = tagline;
  
  // }
}