import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { ManagerUserComponent } from "./manager-user/manager-user.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NgModule } from "@angular/core";
import { TableComponent } from "./table/table.component";
import { NewProcessInitiateComponent } from "./new-process-initiate/new-process-initiate.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'register',
    component: RegistrationComponent,
    children: [
      {
        path: 'addUser',
        component: ManagerUserComponent
      },
     
    ]
  },
  {
    path: 'tableData',
    component: TableComponent
  },
  {
    path: 'initiateNewProcess',
    component: NewProcessInitiateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
