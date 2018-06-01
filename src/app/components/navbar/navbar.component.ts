import { Component, OnInit, ElementRef } from '@angular/core';
import { HOSPITAL, PATIENT, DOCTOR, Admin } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ServiceService } from '../../services/service.service';
import { TokenStorage } from '../../services/token.storage';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

declare var $: any;
const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;
  message: boolean = false;
  public name: string;
  public type: string;
  public adata: any;
  public arr: any[] = [];
  AppointmentLength: number;
  socket: any;
  id : number;
  id1 : string;


  constructor(private userService: UserService, location: Location, private element: ElementRef,
    private authService: AuthService,
    private token: TokenStorage,
    private router: Router,
    public serviceService: ServiceService, private route: ActivatedRoute) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    $(document).ready(function () {
      $("#notificationLink").click(function () {
        $("#notificationContainer").fadeToggle(1000);
        $("#notification_count").fadeOut("slow");
        $('#notificationLink > i.fa-bell').addClass('fa-bell-o');
        $('#notificationLink > i.fa-bell').removeClass('fa-bell');
        return false;
      });

      $(document).click(function () {
        $("#notificationContainer").hide();
      });

      $("#notificationContainer").click(function () {
        return false;
      });

    });

   
    this.listTitles = HOSPITAL.filter(listTitle => listTitle);
    this.listTitles = this.listTitles.concat(PATIENT.filter(listTitle => listTitle));
    this.listTitles = this.listTitles.concat(DOCTOR.filter(listTitle => listTitle));
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];

    this.serviceService.currentMessage.subscribe(message =>
      this.message = message
    );


    this.serviceService.currentName.subscribe(name =>
      this.name = name
    ); this.name = localStorage.getItem('name');

    this.serviceService.currenId.subscribe(id =>
      this.id = id
    ); 
    this.id1 = localStorage.getItem('id');
  
    //this.id1=parseInt(this.id);
    
   

    this.serviceService.currentType.subscribe(type =>
      this.type = type
    )
    this.type = localStorage.getItem('type');

    if ((this.message == true) || (localStorage.getItem('type') != null) || (localStorage.getItem('token') != null)) {
      this.message = true;
    }

    this.userService.appoitmentList().subscribe(
      appointment => {
        this.adata = appointment;
        for (var i = 0; i < this.adata.data.length; i++) {
          if (this.name == this.adata.data[i].DoctorName) {
            this.arr.push(this.adata.data[i]);
            this.AppointmentLength = this.arr.length;
            var $scope;
            // setInterval(function () {
            //   $scope.appoitmentList();
            // }, 1200)
          }
        }
      },
      err => {
        console.log(err);
      }
    );

  }

  logout(id) {

   console.log(id);
    this.userService.logout(id).subscribe(
      logout => {
        console.log("logout");
        this.token.signOut();
        this.serviceService.changeMessage(true);
        this.message = false;

        localStorage.removeItem('value');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('type');
        localStorage.removeItem('token');
        localStorage.clear();
        this.router.navigate(['login']);
      },
      err => {
        console.log(err);
      }
    );
  }

  changePassword() {
    this.router.navigate(['forgotPassword']);
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  };

  getTitle() {
    var title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(2);
    }
    title = title.split('/')[0];
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === title) {
        return this.listTitles[item].title;
      }
    }
    //  return 'Dashboard';
  }

  viewAppointment() {
    this.router.navigate(['/appointment']);
  }

}
