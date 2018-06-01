import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientRegistration } from '../model/PatientRegistration';
import { CommentStmt } from '@angular/compiler';
import {Http, Response} from '@angular/http'


declare var jquery: any;
declare var $: any;

declare const google: any;
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  public name: string;
  public adata: any;
  public hospital: string;
  public arr: any[] = [];
  rForm: FormGroup;
  AppointmentLength: number;
  public hdata: any;
  public ddata: any;
  public pdata: any;
  public sdata: any;
  public term;
  public arr1: any[] = [];
  public arr2: any[] = [];
  public arr3: any[] = [];
  angular: any;
  message1: any;
  fromDate: any;
  toDate: any;
  users: any;
  public userType: String[];
  public date: string;
  friends: any;
  person: string;

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), day, mnth].join("-");
  }

  constructor(http: Http, private router: Router, private formBuilder: FormBuilder, private token: TokenStorage, private userService: UserService) {

    this.rForm = this.formBuilder.group({

      //'hospital': [null, Validators.required],
      //'doctor': [null, Validators.required],
      'fromDate': [null, Validators.required],
      'toDate': [null, Validators.required],
      'userType': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.userType = ['Doctor', 'Patient'];

    this.userService.currentMessage.subscribe(message =>
      this.message1 = message);

      // http.request('my-friends.txt').subscribe(response => this.friends = response.text());
      // http.get('friends.json')
      //             .map(response => response.json())
      //             .subscribe(result => this.friends =result);

    if ((this.message1 == true) || (localStorage.getItem('token') != null) || (localStorage.getItem('type') != null)) {
      this.message1 = true
    } else {
      this.router.navigate(['login']);
    }

    this.name = localStorage.getItem('name');

    this.userService.hospitalList().subscribe(
      hospital1 => {
        this.hdata = hospital1;
        this.arr1 = [];
        for (var i = 0; i < this.hdata.length; i++) {
          this.arr1.push(this.hdata[i]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  isFieldValid(field: string, type: number = 1) {
    return (type == 1) ? (!this.rForm.get(field).valid && this.rForm.get(field).touched && this.rForm.get(field).value != '' && this.rForm.get(field).value != null) : (this.rForm.get(field).value == '' || this.rForm.get(field).value == null);
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field, 1),
      'has-feedback': this.isFieldValid(field, 1)
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
  saverange(newValue) {
    this.hospital = newValue;
    this.userService.doctorList().subscribe(
      doctor1 => {
        this.ddata = doctor1;
        this.arr2 = [];
        for (var i = 0; i < this.ddata.data.length; i++) {
          if (this.hospital == this.ddata.data[i].HospitalName) {
            this.arr2.push(this.ddata.data[i]);
            console.log(this.arr2);
            
          }
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  view(post) {
    if (this.rForm.valid) {
      this.person=post.userType;
    const user = {};
    user['fromDate'] = post.fromDate;
    user['toDate'] = post.toDate;
    user['userType'] = post.userType;

    this.userService.patientListReport(user).subscribe(
      patient => {
        this.ddata = patient;
        this.arr3 = [];
        for (var i = 0; i < this.ddata.data.length; i++) {
          this.arr3.push(this.ddata.data[i]);
        }
      },
      err => {
        console.log(err);
      }
    );
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

}
