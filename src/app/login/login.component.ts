import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ServiceService } from '../services/service.service';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientRegistration } from '../model/PatientRegistration';
import { ParamMap } from '@angular/router/src/shared';

declare var $: any;
const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  message: boolean;
  post: any;
  error1 = '';
  id: number;
  id1: number;
  type: string;
  name: string;
  error;
  message1: boolean;
  email: string;
  example = { username: '', password: '' };
  value: any;
  userType: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private authService: AuthService,
    private router: Router,
    private token: TokenStorage,
    private ServiceService: ServiceService,
    private formBuilder: FormBuilder) {
    this.rForm = formBuilder.group({
      'username': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required]],
      'userType': [null, [Validators.required]]
    });
    this.value = JSON.parse(localStorage.getItem('key'));
  }


  showNotification() {

  }



  ngOnInit() {
    this.userType = ['Doctor', 'Patient','Admin','Hospital'];

    this.ServiceService.currentMessage.subscribe(message => this.message = message)

    if ((localStorage.getItem('token') != null)) {
      this.router.navigate(['dashboard']);
    }
    this.userService.currentMessage.subscribe(message =>
      this.message1 = message);

    if ((this.message1 == false) || (localStorage.getItem('token') == null) || (localStorage.getItem('type') == null)) {
      this.message1 = false
    } else {
      this.router.navigate(['login']);
    }

    this.userService.currentType.subscribe(type =>
      this.type = type
    );
    this.type = this.token.getType();
  }

  newMessage() {
    this.ServiceService.changeMessage(true);
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

  addlogin(post, from, align): void {
    // if (this.rForm.valid) {
    this.authService.attemptAuth(post.username, post.password, post.userType).subscribe(
      data => {
        this.error1 = data.msg;
        const type1 = ['success'];
        $.notify({
          icon: "notifications",
          message: "" + this.error1 + ""

        }, {
            type: type1,
            timer: 500,
            placement: {
              from: from,
              align: align
            }
          });

  
        if (data.data.token != null) {
          localStorage.setItem('id', data.data.id);
          localStorage.setItem('name', data.data.firstname);
          localStorage.setItem('email', data.data.email);
          localStorage.setItem('type', data.data.userType);
          localStorage.setItem('token', data.data.token);

          this.token.saveToken(data.data.token);
          this.id = data.data.id;
          this.type = data.data.userType;
          this.name = data.data.firstname;
          this.email = data.data.email;
          this.ServiceService.changeMessage(false);
          this.ServiceService.changeId(this.id);
          this.ServiceService.changeType(this.type);
          this.ServiceService.changeName(this.name);
          this.ServiceService.changeEmail(this.email);
          //this.ServiceService.check();
          this.token.saveId(data.data.id);
          this.token.saveType(data.data.userType);
          this.token.saveName(data.data.firstname);
          this.token.saveEmail(data.data.email);
          this.ServiceService.setId(this.id1);
          this.router.navigate(['dashboard']);
        }
      },
      error => {
        //console.log(JSON.stringify("Service is not start"));
        this.error = JSON.stringify('Server is not start,So Palese Satrt Serve');

        const type1 = ['danger'];

        $.notify({
          icon: "notifications",
          message: "" + this.error + ""

        }, {
            type: type1,
            timer: 500,
            placement: {
              from: from,
              align: align
            }
          });
      }
    )
    // }else {
    //   this.validateAllFormFields(this.rForm);
    // }
  }

  //  forgotPassword(){
  //   this.authService.forgotPassword(this.example.username).subscribe(
  //     data=>{
  //      console.log(data);
  //      this.email =this.example.username;
  //      this.ServiceService.changeEmail(this.email);
  //      this.token.saveEmail(this.example.username);
  //      console.log(this.email);
  //     }
  //   )
  // }

}
