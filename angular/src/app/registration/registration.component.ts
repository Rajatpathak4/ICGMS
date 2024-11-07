import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirstServiceService } from '../service/first-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginForm!: FormGroup;
  loginData: any;
  users: any;
  item: any;
  data: any;
  dataValue: any;

  constructor(private userDetail: FirstServiceService, public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      contact_number: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      department_id: new FormControl(Validators.required),
      designation_id: new FormControl(Validators.required),
      role_type: new FormControl('', Validators.required),
      user_type: new FormControl('SUPERADMIN'),
    });

    this.userDetail.getUserinTable().subscribe((res)=>{
      console.log(res);
      this.data=res
      this.users=this.data.value
      console.log(this.users)
    })  
   
  }
    
  onSubmit() {
    this.router.navigate(['/tableData']);
    if (this.loginForm.valid) {
      this.userDetail.addUserDetail(this.loginForm.value).subscribe((response) => {
        this.loginData = response;
        console.log(this.loginData);
        localStorage.setItem('loginToken', (this.loginData.accessToken));
      },
        (error) => {
          console.error('Error submitting form:', error);
        }
      );
    } 
    this.userDetail.updateUserDetail(this.data.value).subscribe((response)=>{
      console.log(response);
    this.dataValue=this.users.value
    console.log(this.dataValue);
    })
  }

  getUser() {
    this.userDetail.getAllUser(this.loginForm.value).subscribe((response: any) => {
      if (Array.isArray(response)) {
        this.users = response;
      } else if (response.data && Array.isArray(response.data)) {
        this.users = response.data;
      } else {
        this.users = [];
      }
      console.log(this.users);
    },
      (error) => {
        console.error('Error fetching users:', error);
        this.users = [];
      }
    );
  }

  onReset() {
    this.loginForm.reset();
    this.router.navigate(['/dashboard']);
  }
}
