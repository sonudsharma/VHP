import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../services/token.storage';
import { PatientRegistration } from '../model/PatientRegistration';
import { Person } from '../model/Person';

declare var $: any;
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  rForm: FormGroup;
  message: boolean;
  message1: string;
  email: string;
  email1: string = "ssharma@raystechserv.com";
  //example={username:'',password:'',otp:''}
  username: string;
  otp: string;
  password: string;
  post: any;
  public users: PatientRegistration;

  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder,
    private token: TokenStorage,
    private userService: UserService) {

    this.rForm = this.formBuilder.group({
      'otp': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
  }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.message = message)

    // if((this.token.getEmial() != null)){
    //   this.router.navigate(['dashboard']);
    // } 

    this.userService.currentEmail.subscribe(email =>
      this.email = email);
    this.email = localStorage.getItem('email');

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

  resetPassword(post, from, align) {
    if (this.rForm.valid) {
      post.username = this.email;
      this.users = new PatientRegistration(post.id, post.firstname, post.lastname, post.username, post.email, post.phone, "1", "0", post.password, post.person, post.h_id, post.speciality, post.type, post.otp, post.userEmail, post.fromDate,post.toDate);

      this.authService.reset(this.users).subscribe(
        data => {
          this.message1 = data.msg;
          const type1 = ['success'];
          $.notify({
            icon: "notifications",
            message: "" + this.message1 + ""
          }, {
              type: type1,
              timer: 500,
              placement: {
                from: from,
                align: align
              }
            });

          this.router.navigate(['/login']);
        }
      )
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

  resetPassword1(post, from, align) {
    if (this.rForm.valid) {
      post.username = this.email;
      this.users = new PatientRegistration(post.id, post.firstname, post.lastname, post.username, post.email, post.phone, "1", "0", post.password, post.person, post.h_id, post.speciality, post.type, post.otp, post.userEmail, post.fromDate,post.toDate);
      this.authService.reset(this.users).subscribe(
        data => {
          this.message1 = data.msg;
          const type1 = ['success'];
          $.notify({
            icon: "notifications",
            message: "" + this.message1 + ""
          }, {
              type: type1,
              timer: 500,
              placement: {
                from: from,
                align: align
              }
            });

          this.router.navigate(['/dashboard']);
        }
      )
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

}