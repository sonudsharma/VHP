import { Component, OnInit } from '@angular/core';;
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientRegistration } from '../model/PatientRegistration';
import { Address } from '../model/Addess';
import { City } from '../model/City';
import { State } from '../model/State';
import { Person } from '../model/Person';
import { Document } from '../model/Document';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

declare var $: any;

const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-up-date',
  templateUrl: './up-date.component.html',
  styleUrls: ['./up-date.component.scss']
})
export class UpDateComponent implements OnInit {

  rForm: FormGroup;

  constructor(public userService: UserService, private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private token: TokenStorage,
    private router: Router) {

    this.rForm = this.formBuilder.group({

      'myFile': [null, Validators.required],
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'age': [null, Validators.required],
      'phone': [null, Validators.required],
      'dob': [null, Validators.required],
      'type': [null, Validators.required],
      'gender': [null, Validators.required],
      'address': [null, Validators.required],
      'pinCode': [null, Validators.required],
      'city': [null, Validators.required],
      'state': [null, Validators.required],
      'country': [null, Validators.required],
      'height': [null, Validators.required],
      'weight': [null, Validators.required],
      'adharnumber': [null, Validators.required],
      'speciality': [null, Validators.required],
      'licienceNumber': [null, Validators.required],
      'tagline': [null, Validators.required],

    });

  }
  Doctor;
  public user1: PatientRegistration;
  Name: string;
  myFile: File;
  id: number;
  idCompare: string;
  message1: boolean;
  message: string;
  public user2: PatientRegistration;
  public upload: Document;
  public idUser: number;
  public fname: string;
  public lname: string;
  public email: string;
  public type: string;
  public phone: string;
  public speciality: string;
  public speciality1: String[];
  public gender: string;
  public gender1: String[];
  public dob: string;
  public adharnumber: string;
  public height: string;
  public weight: string;
  public check: boolean;
  public fullName: string;
  public city: any;
  public state: any;
  public country: any;
  public pincode: string;
  public fulladdress: string;
  public photo: string;
  public password: string;
  public h_name: string;
  public licienceNumber: string;
  public tagline: string;
  id1: string;
  id2: number;
  public user: String[];
  publicperson: string;
  type1: string;
  age: string;
  sdata: any;
  cityData: any;
  stateData: any;
  countryData: any;
  arr: string[] = [];
  arr1: any[] = [];
  arr2: any[] = [];
  arr3: any[] = [];
  length: number;

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }



  ngOnInit() {

    this.user = ['Doctor', 'Patient', 'Hospital'];
    this.gender1 = ['Male', 'Female'];
    this.speciality1 = ['Cardiologist', 'Cardiovascular surgeon', 'Anesthesiologist', 'Adolescent medicine specialist'
      , 'Addiction psychiatrist'];

      if ((this.message1 == true) || (localStorage.getItem('token') != null) || (localStorage.getItem('type') != null)) {

        if (localStorage.getItem('id') != null) {
          this.message1 = true
        }
      } else {
        this.router.navigate(['login']);
      }

    this.type1 = localStorage.getItem('type');

    this.activeRoute
      .paramMap
      .subscribe((params: ParamMap) => {
        let id = this.userService.getId();
        this.id2 = id;

        if (this.id2) {
          this.userService.getUser(this.id2).subscribe(
            data => {
              var date = new Date(data.person.dob);
              // console.log(this.convert(data.person.dob));
              //var sdf = new getLocaleDateFormat()
              this.fname = data.person.firstName;
              this.lname = data.person.lastName;
              this.email = data.userEmail;
              this.type = data.type;
              this.phone = data.person.phone;
              this.gender = data.person.gender;
              this.dob = this.convert(data.person.dob);
              this.adharnumber = data.person.adharnumber;
              this.height = data.person.height;
              this.weight = data.person.weight;
              this.speciality = data.person.speciality;
              this.fullName = data.person.fullName;
              this.city = data.person.address.city.id;
              this.state = data.person.address.city.state.name;
              this.country = data.person.address.city.state.country.name;
              this.pincode = data.person.address.postalcode;
              this.fulladdress = data.person.address.fulladdress;
              this.photo = data.person.photourl;
              this.password = data.password;
              this.h_name = data.person.hospital.name;
              this.age = data.person.age;
              this.licienceNumber = data.person.liciencenumber;
              this.tagline = data.person.tagline;
              this.user2 = data;
            }
          );
        }

        if ((localStorage.getItem('token') != null)) {
          this.userService.specialityList().subscribe(
            data => {
              this.sdata = data;
              for (var i = 0; i < this.sdata.data.length; i++) {
                this.arr.push(this.sdata.data[i]);
              }
            },
            err => {
            }
          );

          this.userService.cityList().subscribe(
            data => {
              this.cityData = data;
              for (var i = 0; i < this.cityData.data.length; i++) {
                this.arr1.push(this.cityData.data[i]);
              }
            },
            err => {
              console.log(err);
            }
          );

          this.userService.stateList().subscribe(
            data => {
              this.stateData = data;
              for (var i = 0; i < this.stateData.data.length; i++) {
                this.arr2.push(this.stateData.data[i]);
              }
            },
            err => {
            }
          );

          this.userService.countryList().subscribe(
            data => {
              this.countryData = data;
              for (var i = 0; i < this.countryData.data.length; i++) {
                this.arr3.push(this.countryData.data[i]);
              }
            },
            err => {
            }
          );
        }

      })
  }

  isFieldValid(field: string) {
    return !this.rForm.get(field).valid && this.rForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  upDate(from, align) {
    
    let date=this.dob;
    let dob= new Date(date);
    const user = {};
    user['id'] = this.id2;
    user['dob'] = dob.getTime();
    user['age'] = this.age;
    user['gender'] = this.gender;
    user['fulladdress'] = this.fulladdress;
    user['postalcode'] = this.pincode;
    user['city'] = this.city;
    user['email'] = this.email;

    if (this.type === 'Patient') {
      user['weight'] = this.weight;
      user['height'] = this.height;
      user['adharnumber'] = this.adharnumber;
    }

    if (this.type === 'Doctor') {
      user['firstname'] = this.fname;
      user['lastname'] = this.lname;
      user['phone'] = this.phone;
      user['licencenumber'] = this.licienceNumber;
      user['tagline'] = this.tagline;
    }

    this.userService.updateUser(user, this.id).subscribe(
      data => {
        const type1 = ['success'];
        this.message = data.msg;
        $.notify({
          icon: "notifications",
          message: "" + this.message + ""
        }, {
            type: type1,
            timer: 500,
            placement: {
              from: from,
              align: align
            }
          });

      });
    if (this.type === 'Doctor') {
      this.router.navigate(['/doctorList']);
    }else{
          this.router.navigate(['/patientList']);
         }
  }

}
