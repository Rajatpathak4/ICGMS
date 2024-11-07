import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegistrationComponent } from './registration/registration.component';
import { ManagerUserComponent } from './manager-user/manager-user.component';
import { TableComponent } from './table/table.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxDaterangepickerMd, LocaleService } from 'ngx-daterangepicker-material';
import { NewProcessInitiateComponent } from './new-process-initiate/new-process-initiate.component';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    NavbarComponent,
    RegistrationComponent,
    ManagerUserComponent,
    TableComponent,
    NewProcessInitiateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule,
    NgApexchartsModule,
    NgxDaterangepickerMd.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      progressAnimation: 'increasing',
      preventDuplicates: false,

      

    }),
  ],
  providers: [
    provideAnimationsAsync(),
    LocaleService,
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


