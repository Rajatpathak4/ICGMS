import { Component, OnInit } from '@angular/core';
import { FirstServiceService } from '../service/first-service.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  users: any;
  loginForm: any;
  data: any;
  // design:any;
  allData: any
  // designation: any;

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

    this.userDetail.getUserinTable().subscribe((res) => {
      console.log(res);
      this.data = res
      this.users = this.data.value
      console.log(this.users)
    })

  }
  onSubmit() {
    this.allData.first_name = this.loginForm.value.first_name,
      this.allData.last_name = this.loginForm.value.last_name,
      this.allData.role_type = this.loginForm.value.role_type,
      this.allData.department_id = this.loginForm.value.department_id,
      this.allData.designation_id= this.loginForm.value.designation_id,
    this.userDetail.updateUserDetail(this.allData).subscribe((res) => {
      console.log(res);
    })
  }

  onReset() {
    this.loginForm.reset()

  }
  editUser(item: any) {
    this.allData = item
    this.loginForm.patchValue(item)
  }
  }
