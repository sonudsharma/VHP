import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientRegistration } from '../model/PatientRegistration';
import { Hospitals } from '../model/hospitals';
import { ParamMap } from '@angular/router/src/shared';

declare var $: any;
const TOKEN_KEY = 'AuthToken';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {

  deleteMessage: string = "User has been deleted successfully.";
  name: string;
  name1: string;
  length: number;
  type: string;
  public hdata: any;
  public arr: any[] = [];
  message1: boolean;
  public term;


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private token: TokenStorage) { }

  ngOnInit() {

    this.userService.currentMessage.subscribe(message => this.message1 = message);

    if ((this.message1 == true) || (localStorage.getItem('token') != null) || (localStorage.getItem('type') != null)) {
      this.message1 = true
    } else {
      this.router.navigate(['login']);
    }

    this.userService.currentType.subscribe(type => this.type = type);
    this.type = localStorage.getItem('type');
    this.name1 = localStorage.getItem('name');
    console.log(this.name1);

    this.route
      .paramMap
      .subscribe((params: ParamMap) => {
        let name = params.get('name');
        this.name = name;
      })


    //if ((this.name != null && this.name1 != null)) {

    if (this.type == 'Hospital') {
      this.userService.doctorList().subscribe(
        users => {
          this.hdata = users;
          for (var i = 0; i < this.hdata.data.length; i++) {
            if (this.name == this.hdata.data[i].HospitalName) {
              this.arr.push(this.hdata.data[i]);
            }
            if (this.name == null) {
              if (this.name1 == this.hdata.data[i].HospitalName) {
                this.arr.push(this.hdata.data[i]);
              } else {
                this.arr.push(this.hdata.data[i]);
              }
            }

          }
        },
        err => {
          console.log(err);
        });
    } else {
      this.userService.doctorList().subscribe(
        users => {
          this.hdata = users;
          for (var i = 0; i < this.hdata.data.length; i++) {
            this.length = this.hdata.data.length;
            if (this.name == this.hdata.data[i].HospitalName) {
              this.arr.push(this.hdata.data[i]);
            }
            if (this.name == null) {
              if (this.name1 == this.hdata.data[i].HospitalName) {
                this.arr.push(this.hdata.data[i]);
              }
              if (this.name1 == this.hdata.data[i].PatientName) {
                this.arr.push(this.hdata.data[i]);
              }
            }
          }
        }, err => {
          console.log(err);
        });
    }

  }

  editUser(id: number) {
    this.userService.setId(id);
    this.router.navigate(['/update']);
  }

  appointment(id: number) {
    this.userService.setId(id);
    this.router.navigate(['/appointment']);
  }

  deleteUser(id: number, from, align) {
    this.userService.deleteUser(id).subscribe(
      data => {
        console.log(data);
        //this.deleteMessage = data.msg;
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

        this.userService.doctorList().subscribe(
          users => {
            this.hdata = users;
            this.arr = [];
            for (var i = 0; i < this.hdata.data.length; i++) {
              this.length = this.hdata.data.length;
              if (this.name == this.hdata.data[i].HospitalName) {
                this.arr.push(this.hdata.data[i]);
              }
            }
          }, err => {
            console.log(err);
          });
      }
    );
    this.router.navigate(['/doctorList']);
  }

}
