import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { TokenStorage } from '../../services/token.storage';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';
import { AuthService } from '../../services/auth.service';
import {  PatientRegistration } from '../../model/PatientRegistration';

declare const $: any;
const TOKEN_KEY = 'AuthToken';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const PATIENT: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'fa fa-dashboard', class: '' },
    { path: 'user-profile', title: 'User Profile',  icon:'fa fa-user', class: '' },
    // { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
    { path: 'hospitalList', title: 'Hospital List',  icon:'fa fa-hospital-o', class: '' },
    // fa fa-hospital-o,fa fa-plus-square
    //{ path: 'patientList', title: 'Patient List',  icon:'fa fa-bed', class: '' },    
    { path: 'doctorList', title: 'Doctor List',  icon:'fa fa-user-md', class: '' },
    { path: 'mediaType', title: 'Media List',  icon:'ka fa-video-camera', class: '' }, 
];

export const DOCTOR: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'fa fa-dashboard', class: '' },
  { path: 'user-profile', title: 'User Profile',  icon:'fa fa-user', class: '' },
  // { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
  { path: 'hospitalList', title: 'Hospital List',  icon:'fa fa-hospital-o', class: '' },
  // fa fa-hospital-o,fa fa-plus-square
  { path: 'patientList', title: 'Patient List',  icon:'fa fa-bed', class: '' }, 
  { path: 'mediaType', title: 'Media List',  icon:'fa fa-video-camera', class: '' }, 
  { path: 'maps', title: 'Reports',  icon:'fa fa-file', class: '' }, 
  //{ path: 'icons', title: 'Icons',  icon:'fa fa-file', class: '' },    
  
];

export const HOSPITAL: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'fa fa-dashboard', class: '' },
  { path: 'user-profile', title: 'User Profile',  icon:'fa fa-user', class: '' },
  // { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
  { path: 'hospitalList', title: 'Hospital List',  icon:'fa fa-hospital-o', class: '' },
  // fa fa-hospital-o,fa fa-plus-square
  { path: 'patientList', title: 'Patient List',  icon:'fa fa-bed', class: '' }, 
   // { path: 'doctorList/:name',          component: DoctorListComponent },
  { path: 'doctorList', title: 'Doctor List',  icon:'fa fa-user-md', class: '' },
  { path: 'mediaType', title: 'Media List',  icon:'fa fa-video-camera', class: '' }, 
  { path: 'maps', title: 'Reports',  icon:'fa fa-file', class: '' },    

];

export const Admin: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard',  icon: 'fa fa-dashboard', class: '' },
  { path: 'user-profile', title: 'User Profile',  icon:'fa fa-user', class: '' },
  // { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '' },
  { path: 'hospitalList', title: 'Hospital List',  icon:'fa fa-hospital-o', class: '' },
  // fa fa-hospital-o,fa fa-plus-square
  { path: 'patientList', title: 'Patient List',  icon:'fa fa-bed', class: '' }, 
   // { path: 'doctorList/:name',          component: DoctorListComponent },
  { path: 'doctorList', title: 'Doctor List',  icon:'fa fa-user-md', class: '' },
  { path: 'mediaType', title: 'Media List',  icon:'fa fa-video-camera', class: '' },     
  
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItems1: any[];
  menuItems2: any[];
  public ts:string;
  message:boolean=false;
  id:string;
  uid:number;
  type: string;
  message1:boolean;
  public user2:PatientRegistration;
  
  public name:string;

  constructor(private serviceService:ServiceService,private authService:AuthService,
    private token:TokenStorage,
    private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.menuItems = PATIENT.filter(menuItem => menuItem);
    this.menuItems1 = DOCTOR.filter(menuItem => menuItem);
    this.menuItems2 = HOSPITAL.filter(menuItem => menuItem);    

    // this.serviceService.currenId.subscribe(id => 
    //     this.uid=id
    //   );
  
    //   this.serviceService.currentMessage.subscribe(message => 
    //     this.message=message
    //   )
    //   this.type=this.token.getToken();
      
      this.serviceService.currentType.subscribe(type => 
        this.type=type
      )
      this.type=localStorage.getItem('type');
     
      // this.serviceService.currentName.subscribe(name => 
      //   this.name=name
      // )
  

      // if((this.message == true) || (this.token.getToken() != null) || (this.token.getType() != null) ){
      //   this.message = true;
      // } 
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
