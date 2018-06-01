import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HttpModule } from "@angular/http";


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DBService } from "./db.service";

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { ControlComponent } from './control/control.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceService } from './services/service.service';
import { TokenStorage } from './services/token.storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/app.interceptor';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UpDateComponent } from './up-date/up-date.component';
import { MediaTypeComponent } from './media-type/media-type.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { AppointmentComponent } from './appointment/appointment.component';
// import {GoogleChart} from 'angular2-google-chart/directives/angular2-google-chart.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    ControlComponent,
    RegisterComponent,
    HospitalListComponent,
    PatientListComponent,
    DoctorListComponent,
    ForgotPasswordComponent,
    ResetpasswordComponent,
    UpDateComponent,
    MediaTypeComponent,
    FieldErrorDisplayComponent,
    AppointmentComponent,
    // GoogleChart

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2SearchPipeModule
  ],
  providers: [DBService, UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    ServiceService,
    AuthService,
    TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
