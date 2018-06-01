import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-media-type',
  templateUrl: './media-type.component.html',
  styleUrls: ['./media-type.component.scss']
})
export class MediaTypeComponent implements OnInit {
function:string;
angular:string;
message1: boolean;
  constructor(public userService: UserService,
    private activeRoute: ActivatedRoute,
    private token: TokenStorage,
    private router: Router) { }

  sdata: any;
  arr: string[] = [];

  ngOnInit() {
    if ((this.message1 == true) || (localStorage.getItem('token') != null) || (localStorage.getItem('type') != null)) {
      this.message1 = true
    } else {
      this.router.navigate(['login']);
    }

    this.userService.mediaTypeList().subscribe(
      data => {
        this.sdata = data;
        for (var i = 0; i < this.sdata.data.length; i++) {
          this.arr.push(this.sdata.data[i]);
        }
      },
      err => {
      }
    );
  }

 
 

}
