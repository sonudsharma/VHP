import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientRegistration } from '../model/PatientRegistration';
import { ParamMap } from '@angular/router/src/shared';
import * as Chartist from 'chartist';
import { Hospitals } from "../model/hospitals";

const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private database: any;
  id: number;
  private users: PatientRegistration[];
  private user: PatientRegistration;
  error = '';
  post: any;
  type: string;
  name: string;
  token1: string;
  public hdata: any;
  public adata: any;
  public chatData: any;
  public arr: any[] = [];
  public arr1: any[] = [];
  public arr2: any[] = [];
  public arr3: any[] = [];
  public arr4: any[] = [];
  message1: boolean;
  Hospital;
  PatientLength: number;
  DoctorLength: number;
  HospitalLength: number;
  AppointmentLength: number;
  private users1: Hospitals[];

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private token: TokenStorage) { }
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };


  public bar_ChartData = [
    ['City', '2010 Population', '2000 Population'],
    ['dfdf', 8175000, 8008000],
    ['Los Angeles, CA', 3792000, 3694000],
    ['Chicago, IL', 2695000, 2896000],
    ['Houston, TX', 2099000, 1953000],
    ['Philadelphia, PA', 1526000, 1517000]];


  bar_ChartOptions = {
    title: 'Population of Largest U.S. Cities',
    chartArea: { width: '50%' },
    hAxis: {
      title: 'Total Population',
      minValue: 0,
      textStyle: {
        bold: true,
        fontSize: 12,
        color: '#4d4d4d'
      },
      titleTextStyle: {
        bold: true,
        fontSize: 18,
        color: '#4d4d4d'
      }
    },
    vAxis: {
      title: 'City',
      textStyle: {
        fontSize: 14,
        bold: true,
        color: '#848484'
      },
      titleTextStyle: {
        fontSize: 14,
        bold: true,
        color: '#848484'
      }
    }
  };

  public map_ChartOptions = {};
  public org_ChartOptions = {
    allowHtml: true
  };

  itemSelected(event) {
    alert(JSON.stringify(event));
  }

  itemDeselected(event) {
    alert("DESELECTED");
  }

  ngOnInit() {

    this.userService.currentMessage.subscribe(message =>
      this.message1 = message);

    if ((this.message1 == true) || (localStorage.getItem('token') != null) || (localStorage.getItem('type') != null)) {

      if (localStorage.getItem('id') != null) {
        this.message1 = true
      }
    } else {
      this.router.navigate(['login']);
    }

    this.userService.currentType.subscribe(type =>
      this.type = type
    );
    this.type = localStorage.getItem('type');
    this.name = localStorage.getItem('name');

    this.route
      .paramMap
      .subscribe((params: ParamMap) => {
        let id = this.userService.getId();
      });




    this.userService.patientList().subscribe(
      users => {
        this.hdata = users;
        //console.log(this.hdata)
        for (var i = 0; i < this.hdata.data.length; i++) {
          this.PatientLength = this.hdata.data.length;
          //console.log(this.PatientLength);
          //if(this.id == this.hdata.data[i].HospitalId){
          // console.log(this.hdata.data[i].HospitalId);
          this.arr.push(this.hdata.data[i]);

          //}
        }
      },
      err => {
        console.log(err);
      }
    );

    this.userService.doctorList().subscribe(
      users => {
        this.hdata = users;
        //console.log(this.hdata)
        for (var i = 0; i < this.hdata.data.length; i++) {
          this.DoctorLength = this.hdata.data.length;
          // console.log(this.DoctorLength);
          //if(this.id == this.hdata.data[i].HospitalId){
          // console.log(this.hdata.data[i].HospitalId);
          this.arr1.push(this.hdata.data[i]);

          //}
        }
      },
      err => {
        console.log(err);
      }
    );

    this.userService.appoitmentList().subscribe(
      appointment => {
        this.adata = appointment;
        for (var i = 0; i < this.adata.data.length; i++) {
          if (this.name == this.adata.data[i].DoctorName) {
            this.arr2.push(this.adata.data[i]);
            this.AppointmentLength = this.arr2.length;
          }
        }
      },
      err => {
        console.log(err);
      }
    );

    this.userService.hospitalList().subscribe(
      users => {
        this.users1 = users;
        this.HospitalLength = this.users1.length;
      },
      err => {
        console.log(err);
      }
    );
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    this.startAnimationForLineChart(dailySalesChart);


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
      series: [
        [230, 750, 450, 300, 280, 240, 200, 190]
      ]
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    this.userService.googleChatBar().subscribe(
      chatBar => {
        this.chatData = chatBar;
        for (var i = 0; i < this.chatData.length; i++) {
          console.log(this.chatData[i].name);
          console.log(this.chatData[i].msgSent);
          console.log(this.chatData[i].msgReceived);
          this.arr3.push(this.chatData[i]);
          var dataEmailsSubscriptionChart = {
            labels: [this.arr3.push(this.chatData[i].name)],
            series: [
              [this.arr3.push(this.chatData[i].msgSent)]

            ],
            series1: [
              [this.arr3.push(this.chatData[i].msgSent)]

            ]
          };

          var optionsEmailsSubscriptionChart = {
            axisX: {
              showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
          };
          var responsiveOptions: any[] = [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                }
              }
            }]
          ];
          var emailsSubscriptionChart = new Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

          //start animation for the Emails Subscription Chart
          this.startAnimationForBarChart(emailsSubscriptionChart);



        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
