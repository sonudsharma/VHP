import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientRegistration } from '../model/PatientRegistration';
import { ParamMap } from '@angular/router/src/shared';
import { encode } from 'punycode';


declare var $: any;
const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  deleteMessage: string = "User has been deleted successfully.";
  id: number;
  private users: PatientRegistration[];
  private user: PatientRegistration;
  error = '';
  post: any;
  length: number;
  token1: string;
  public hdata: any;
  public term;
  public arr: any[] = [];
  name: string;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private token: TokenStorage) { }
  type: string;
  message1: boolean
  ngOnInit() {

    this.userService.currentType.subscribe(type =>
      this.type = type
    );
    this.type = localStorage.getItem('type');

    this.userService.currentMessage.subscribe(message =>
      this.message1 = message);

    if ((this.message1 == true) || (localStorage.getItem('token') != null) || (localStorage.getItem('type') != null)) {
      this.message1 = true
    } else {
      this.router.navigate(['login']);
    }
    this.name = localStorage.getItem('name');

    this.route
      .paramMap
      .subscribe((params: ParamMap) => {
        let id = parseInt(params.get('id'));
        this.id = id;
      })


    if ((this.name != null)) {
      this.userService.patientList().subscribe(
        users => {
          this.hdata = users;
          for (var i = 0; i < this.hdata.data.length; i++) {
            this.length = this.hdata.data.length;
            if (this.name == this.hdata.data[i].HospitalName) {
              this.arr.push(this.hdata.data[i]);
            }
            if (this.name == this.hdata.data[i].DoctorName) {
              this.arr.push(this.hdata.data[i]);
            }
            
          }
        }, err => {
          console.log(err);
        });
    } 
    if(this.type == 'Hospital') {
      this.userService.patientList().subscribe(
        users => {
          this.hdata = users;
          //console.log(this.hdata)
          for (var i = 0; i < this.hdata.data.length; i++) {
            this.length = this.hdata.data.length;
            this.arr.push(this.hdata.data[i]);

            //}
          }
        },
        err => {
          console.log(err);
        });
    }else{

    }

  }

  editUser(id: number) {
    this.userService.setId(id);
    this.router.navigate(['/update']);
  }

  deleteUser(id: number, from, align) {
    this.userService.deleteUser(id).subscribe(
      users => {
        //this.deleteMessage = users.msg;
        const type1 = ['success'];
        $.notify({
          icon: "notifications",
          message: "" + this.deleteMessage + ""
        }, {
            type: type1,
            timer: 500,
            placement: {
              from: from,
              align: align
            }
          });
        this.userService.patientList().subscribe(
          users => {
            this.hdata = users;
            this.arr = [];
            for (var i = 0; i < this.hdata.data.length; i++) {
              this.length = this.hdata.data.length;
              this.arr.push(this.hdata.data[i]);
            }
            console.log(this.arr);
          },
          err => {
            console.log(err);
          }
        );
      }
    );

  }

}

