import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirstServiceService } from '../service/first-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginData: any;
  role_id: any;
  formData2:any

  constructor(
    public userDetail: FirstServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userDetail.saveUserDetail(this.loginForm.value).subscribe((response:any) => {
          this.loginData = response;
          this.formData2=this.loginForm.value
          this.role_id=response.role_id
          this.router.navigate(['/dashboard']);
          this.toastr.success("Login Successful");
          this.loginForm.reset();
      

          this.userDetail.getUserDetail(this.role_id,this.formData2).subscribe((response: any) => {
            console.log(response);  
            localStorage.setItem("loginToken", this.loginData.access_token);

          })   
            
        },
        (error) => {
          this.toastr.error('Incorrect username or password');

        }
      );
    } else {
      this.toastr.warning('Please enter valid credentials', 'Form Incomplete');
    }
   
}
}




