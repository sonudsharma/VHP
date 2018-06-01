import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { DBService } from "./db.service";
import { ServiceService } from './services/service.service';
import { TokenStorage } from './services/token.storage';

declare const $: any;
const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    private database: any;
    message:boolean;
    type: string;

    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor( public location: Location, private router: Router, private dbService: DBService,private serviceService:ServiceService
        ,private token:TokenStorage) {
       // console.log(`${Date.now()}:App Component: Constructor`);
    }

    deviceInit() {
        console.log(`${Date.now()}:App Component: deviceInit`);
        this.database = this.dbService.get();
    }

    ngOnInit() {
        //console.log(this.message);
        // Startup local database when device is ready
       // console.log(`${Date.now()}:App Component: ngOnInit - ${window['_cordovaNative']}`);
        if(window['_cordovaNative']){
      	   document.addEventListener("deviceready", this.deviceInit.bind(this), false);
  		  }

        $.material.init();
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
         this.router.events.subscribe((event:any) => {
            this.navbar.sidebarClose();
            if (event instanceof NavigationStart) {
               if (event.url != this.lastPoppedUrl)
                   this.yScrollStack.push(window.scrollY);
           } else if (event instanceof NavigationEnd) {
               if (event.url == this.lastPoppedUrl) {
                   this.lastPoppedUrl = undefined;
                   window.scrollTo(0, this.yScrollStack.pop());
               } else
                   window.scrollTo(0, 0);
           }
        });
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
             elemMainPanel.scrollTop = 0;
             elemSidebar.scrollTop = 0;
        });
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            let ps = new PerfectScrollbar(elemMainPanel);
            ps = new PerfectScrollbar(elemSidebar);
        }

        this.serviceService.currentMessage.subscribe(message => 
            this.message=message
          );
          
          
          this.serviceService.currentType.subscribe(type => 
            this.type=type
          );
          this.type=localStorage.getItem('type');
         
          if((this.message == false) || (localStorage.getItem('token') != null) || localStorage.getItem('id') != null){
            this.message = false;
          }
    }
    ngAfterViewInit() {
        this.runOnRouteChange();
    }
    isMaps(path){
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(path == titlee){
            return false;
        }
        else {
            return true;
        }
    }
    runOnRouteChange(): void {
      if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
        const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
        const ps = new PerfectScrollbar(elemMainPanel);
        ps.update();
      }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    }
}
