import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirstServiceService } from '../service/first-service.service';

@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrl: './manager-user.component.css'
})
export class ManagerUserComponent {
  users: any;


  constructor(private router:Router,private userDetail:FirstServiceService){ }



}