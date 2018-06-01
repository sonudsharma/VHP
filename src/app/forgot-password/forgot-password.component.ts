import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../services/token.storage';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientRegistration } from '../model/PatientRegistration';
import { Person } from '../model/Person';

declare var $: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  message: boolean;
  message1: string;
  post: any;
  error;
  error1 = '';
  id: number;
  type: string;
  name: string;
  email: any;
  email1: any;
  example = { username: '', password: '' }
  rForm: FormGroup;
  public users: PatientRegistration;



  constructor(private authService: AuthService,
    private router: Router, private formBuilder: FormBuilder,
    private token: TokenStorage,
    private userService: UserService) {

    this.rForm = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.userService.currentMessage.subscribe(message => this.message = message)

    this.userService.currentEmail.subscribe(email =>
      this.email = email);
    this.email = localStorage.getItem('email');


    // if((this.token.getToken() != null)){
    //   this.router.navigate(['dashboard']);
    // } 
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

  forgotPassword(post, from, align) {
    if (this.rForm.valid) {
      this.users = new PatientRegistration(post.id, post.firstname, post.lastname, post.username, post.email, post.phone, "1", "0", post.password, post.person, post.h_id, post.speciality, post.type, post.otp, post.userEmail, post.fromDate,post.toDate);
      this.authService.forgotPassword(this.users).subscribe(
        data => {
          this.email = post.email;
          this.userService.changeEmail(this.email);
          this.token.saveEmail(this.email);
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

          this.router.navigate(['/resetPassword']);
        }
      )
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }


  forgotPassword1(from, align) {
    this.authService.forgotPassword1(this.email).subscribe(
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

        this.router.navigate(['/resetPassword']);
      }
    )
  }


}
