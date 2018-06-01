import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Hospitals } from "../model/hospitals";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';


const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent implements OnInit {

  public users: Hospitals[];
  private user: Hospitals;
  private id: number;
  length: number;
  public term;
  public type: string;
  name: string;
  public arr: any[] = [];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private token: TokenStorage) {
    this.router = router;
  }

  message1: boolean;
  ngOnInit() {

    this.userService.currentMessage.subscribe(message =>
      this.message1 = message);
    this.type = localStorage.getItem('type');
    this.name = localStorage.getItem('name');

    if ((this.message1 == true) || (localStorage.getItem('token') != null)) {
      this.message1 = true
    } else {
      this.router.navigate(['login']);
    }

    this.getAllUser();
  }

  getAllUser() {
    if ((this.name != null)) {
      this.userService.hospitalList().subscribe(
        hospital => {
          this.users = hospital;
          for (var i = 0; i < this.users.length; i++) {
            if (this.name == this.users[i].name) {
              this.arr.push(this.users[i]);
            }
          }
        }, err => {
          console.log(err);
        });
    }
    if (this.type == 'Hospital') {
      this.userService.hospitalList().subscribe(
        hospital => {
          this.users = hospital;
          for (var i = 0; i < this.users.length; i++) {
            this.arr.push(this.users[i]);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
    if (this.type != 'Hospital') {
      if (this.type != 'Admin') {
        this.userService.hospitalList().subscribe(
          hospital => {
            this.users = hospital;
            for (var i = 0; i < this.users.length; i++) {
              this.arr.push(this.users[i]);
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    }
  }

  doctor(name: string) {
    this.router.navigate(['/doctorList', name]);
  }

  register(name: string) {
    this.router.navigate(['/register', name]);
  }

}
