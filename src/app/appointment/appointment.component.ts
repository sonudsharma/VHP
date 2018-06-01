import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TokenStorage } from '../services/token.storage';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PatientRegistration } from '../model/PatientRegistration';
import { ParamMap } from '@angular/router/src/shared';
import { encode } from 'punycode';
import { FormsModule } from '@angular/forms';


declare var $: any;
const TOKEN_KEY = 'AuthToken';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  deleteMessage: string = "User has been deleted successfully.";
  id: number;
  name: string;
  hospital1: string = "";
  speciality1: string = "";
  doctor1: string = "";
  public hospital: string;
  public doctor: string;
  public speciality: string;
  private users: PatientRegistration[];
  private user: PatientRegistration;
  error = '';
  post: any;
  length: number;
  rForm: FormGroup;
  token1: string;
  public hdata: any;
  public ddata: any;
  public adata: any;
  public sdata: any;
  AppointmentLength: number;
  public term;
  public arr: any[] = [];
  public arr1: any[] = [];
  public arr2: any[] = [];
  public arr3: any[] = [];
  public date: string;

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute, private token: TokenStorage) {

    this.rForm = this.formBuilder.group({

      'hospital': [null, Validators.required],
      'doctor': [null, Validators.required],
      'name': [null, Validators.required],
      'speciality': [null, Validators.required],
      'date': [null, Validators.required],
      'time': [null, Validators.required]



    });
  }
  type: string;
  message1: boolean

  ngOnInit() {

    this.userService.currentType.subscribe(type =>
      this.type = type
    );
    this.type = this.token.getType();
    this.name = this.token.getName();
    this.userService.currentMessage.subscribe(
      message => this.message1 = message);

    if ((this.message1 == true) || (this.token.getToken() != null) || (this.token.getType() != null)) {
      this.message1 = true
    } else {
      this.router.navigate(['login']);
    }

    this.route
      .paramMap
      .subscribe((params: ParamMap) => {
        let id = this.userService.getId();
        this.id = id;
      });

    this.userService.appoitmentList().subscribe(
      appointment => {
        this.adata = appointment;
        for (var i = 0; i < this.adata.data.length; i++) {
          if (this.name == this.adata.data[i].DoctorName) {
            this.arr.push(this.adata.data[i]);
            this.AppointmentLength = this.arr.length;
          }

          if (this.name == this.adata.data[i].patientName) {
            this.arr.push(this.adata.data[i]);
            this.AppointmentLength = this.arr.length;
          }
        }
      },
      err => {
        console.log(err);
      }
    );

    this.userService.hospitalList().subscribe(
      hospital1 => {
        this.hdata = hospital1;
        this.arr1 = [];
        for (var i = 0; i < this.hdata.length; i++) {
          this.arr1.push(this.hdata[i]);
        }
      },
      err => {
        console.log(err);
      }
    );

    if (this.id) {
      this.userService.getUser(this.id).subscribe(
        doctor1 => {
          this.hospital = doctor1.person.hospital.name;
          this.doctor = doctor1.person.fullName;
          this.speciality = doctor1.person.speciality;
        },
        err => {
          console.log(err);
        }
      );
    }

    this.userService.doctorList().subscribe(
      doctor1 => {
        this.ddata = doctor1;
        this.arr2 = [];
        for (var i = 0; i < this.ddata.data.length; i++) {
          this.arr2.push(this.ddata.data[i]);
        }
      },
      err => {
        console.log(err);
      }
    );

    this.userService.specialityList().subscribe(
      speciality1 => {
        this.sdata = speciality1;
        for (var i = 0; i < this.sdata.data.length; i++) {
          this.arr3.push(this.sdata.data[i]);
        }
      },
      err => {
      }
    );

  }

  saverange(newValue) {
    this.speciality1 = newValue;
    this.userService.doctorList().subscribe(
      doctor1 => {
        this.ddata = doctor1;
        this.arr2 = [];
        for (var i = 0; i < this.ddata.data.length; i++) {
          if (this.speciality1 == this.ddata.data[i].Speciality) {
            this.arr2.push(this.ddata.data[i]);
          }
        }
      },
      err => {
        console.log(err);
      }
    );
    
  }

  saverange2(newValue2) {
    this.doctor1 = newValue2;
    this.userService.doctorList().subscribe(
      doctor1 => {
        this.ddata = doctor1;
        this.arr2 = [];
        for (var i = 0; i < this.ddata.data.length; i++) {
          if (this.doctor1 == this.ddata.data[i].title) {
            this.arr2.push(this.ddata.data[i]);
            this.hospital1 = this.ddata.data[i].HospitalName;
            this.userService.hospitalList().subscribe(
              hospital1 => {
                this.hdata = hospital1;
                this.arr1 = [];
                for (var i = 0; i < this.hdata.length; i++) {
                  if (this.hospital1 == this.hdata[i].name) {
                  this.arr1.push(this.hdata[i]);
                  }
                }
              },
              err => {
                console.log(err);
              }
            );
          }
        }
      },
      err => {
        console.log(err);
      }
    );
    
  }


  isFieldValid(field: string, type: number = 1) {
    return (type == 0) ? (!this.rForm.get(field).valid && this.rForm.get(field).touched && this.rForm.get(field).value != '') : this.rForm.get(field).value == '';
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

  appointment(post, from, align) {
    if (this.rForm.valid) {
      this.userService.appoitmentBook().subscribe(
        data => {
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

        });
    } else {
      this.validateAllFormFields(this.rForm);
    }
  }

}
