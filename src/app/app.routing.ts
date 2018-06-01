import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UpDateComponent } from './up-date/up-date.component';
import { MediaTypeComponent } from './media-type/media-type.component';
import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/:id', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'table-list', component: TableListComponent },
  { path: 'typography', component: TypographyComponent },
  { path: 'icons', component: IconsComponent },
  { path: 'maps', component: MapsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:name', component: RegisterComponent },
  { path: 'hospitalList', component: HospitalListComponent },
  { path: 'patientList', component: PatientListComponent },
  { path: 'doctorList', component: DoctorListComponent },
  { path: 'doctorList/:name', component: DoctorListComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetpasswordComponent },
  { path: 'update', component: UpDateComponent },
  { path: 'mediaType', component: MediaTypeComponent },
  { path: 'error', component: FieldErrorDisplayComponent },
  { path: 'appointment', component: AppointmentComponent }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }

