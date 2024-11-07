import { Component } from '@angular/core';
import { FirstServiceService } from '../service/first-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user = {
    firstName: 'Md',
    lastName: 'Jasim',
    email: 'jasim@superadmin.com',
    contactNumber: '9234567890',
    userType: 'SUPERADMIN',
    roleType: 'ADMIN'
  };

  constructor( private userDetail: FirstServiceService) {}
  onlogout(){
    localStorage.removeItem('loginToken')

  }

}





