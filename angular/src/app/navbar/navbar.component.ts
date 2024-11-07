import { Component, OnInit } from '@angular/core';
import { FirstServiceService } from '../service/first-service.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  onRegister() {
throw new Error('Method not implemented.');
}

  logoutData:any;

  constructor(private userDetail: FirstServiceService, public router:Router) { }
  ngOnInit(): void {
  }
  onlogout() {
    
}
onInitiate(){ 
  this.router.navigate(['/initiateNewProcess']);
  }
  // onVIew(){
  //   this.router.navigate(['/viewList'])
  // }


}
