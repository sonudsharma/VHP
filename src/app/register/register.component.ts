import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientRegistration } from '../model/PatientRegistration';
import { Person } from '../model/Person';
import { Address } from '../model/Addess';
import { City } from '../model/City';
import { State } from '../model/state';
import { Country } from '../model/Country';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TokenStorage } from '../services/token.storage';
import { Hospitals } from '../model/hospitals';

declare var $: any;
const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() errorMsg: string;
  @Input() displayError: boolean;
  public person: Person;
  public address: Address;
  public city: City;
  public state: State;
  public country: Country;
  public users: PatientRegistration;
  rForm: FormGroup;
  message: boolean;
  post: any;                     // A property for our submitted form
  password: string = '';
  username: string = '';
  titleAlert: string = 'This field is required';
  unameEr = false;
  pwdEr = false;
  msg = "";
  err: boolean;
  public id: number;
  name: string;
  public user2: Hospitals;
  message1: boolean;
  gender: string[];
  Message2: string;

  speciality1: string[];
  user: string[];
  sdata: any;
  cityData: any;
  stateData: any;
  arr: string[] = [];
  arr1: string[] = [];
  arr2: string[] = [];
  length: number;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute, private token: TokenStorage) {

    this.rForm = this.formBuilder.group({

      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      'phone': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],

    });
  }


  ngOnInit() {
    this.user = ['Doctor', 'Patient', 'Hospital'];
    this.gender = ['Male', 'Female', 'Other'];
    this.speciality1 = ['Cardiologist', 'Cardiovascular surgeon', 'Anesthesiologist', 'Adolescent medicine specialist'
      , 'Addiction psychiatrist'];


    this.userService.currentMessage.subscribe(message => this.message = message)

    if ((this.message1 == true) || (localStorage.getItem('token') != null)) {
      this.message1 = true
    }

    this.id = this.route.snapshot.params['id']
    this.route.params
      .subscribe(
        (params: Params) => {
          this.name = params['name'];
        }
      );
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
    }
  }



  newMessage() {
    this.userService.changeMessage(true);
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


  addPost(post, from, align) {
    if (this.rForm.valid) {

      this.users = new PatientRegistration(post.id, post.firstname, post.lastname, post.username, post.email, post.phone, "1", "0", post.password, post.person, post.h_id, post.speciality, post.type, post.otp, post.userEmail, post.fromDate,post.toDate);
      this.userService.create(this.users).subscribe(data => {

        this.Message2 = data.msg;

        const type1 = ['success'];
        $.notify({
          icon: "notifications",
          message: "" + this.Message2 + ""
        }, {
            type: type1,
            timer: 500,
            placement: {
              from: from,
              align: align
            }
          });

        if (data.success == 1) {
          this.msg = data.msg;
        } else {
          this.msg = data.msg;
        }

      });
      if (this.rForm.valid == true) {
        this.router.navigate(['/login']);
      }
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }


  addPost1(post, from, align) {
    if (this.rForm.valid) {

      this.users = new PatientRegistration(post.id, post.firstname, post.lastname, post.username, post.email, post.phone, "1", "0", post.password, post.person, post.h_id, post.speciality, post.type, post.otp, post.userEmail, post.fromDate,post.toDate);
      this.userService.create(this.users).subscribe(data => {

        const type1 = ['success'];
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
        if (data.success == 1) {
          this.msg = data.msg;
        } else {
          this.msg = data.msg;
        }

      });

      if (this.rForm.valid == true) {
        this.router.navigate(['/hospitalList']);
      }
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

}
