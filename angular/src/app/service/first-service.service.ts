import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirstServiceService {
  setInitiateData(data: Object) {
    throw new Error('Method not implemented.');
  }
  edituserData: any;
  getDashboard: any;

  constructor(private http: HttpClient) { }

  saveUserDetail(data: any) {
    let token = localStorage.getItem("loginToken")
    return this.http.post('https://dev-api.icgms.sharajman.com/get_count_user', data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    });
  }

  getUserDetail(role_id:any,data:any) {
    let token= localStorage.getItem('loginToken')
    return this.http.post(`https://dev-api.icgms.sharajman.com/token/${role_id}`,data,{
      headers:{
         'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }

  logoutUserDetail(data: any) {
    return this.http.post('https://dev-api.icgms.sharajman.com/logout', data);
  }

  addUserDetail(data: any) {
    let token = localStorage.getItem("loginToken")
    return this.http.post('https://dev-api.icgms.sharajman.com/add-user', data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }

  getAllUser(data: any) {
    let token = localStorage.getItem("loginToken")
    return this.http.post('https://dev-api.icgms.sharajman.com/get-active-user-details', data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }

  getUserinTable() {
    let token = localStorage.getItem("loginToken")
    return this.http.post('https://dev-api.icgms.sharajman.com/get-all-user-list', {
      "page_number": 1,
      "record_per_page": 10,
      "user_type": "SUPERADMIN"
    }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }

  getUserData() {
    return this.edituserData;
  }
  updateUserDetail(data: any) {
    let token = localStorage.getItem("loginToken")
    return this.http.post('https://dev-api.icgms.sharajman.com/update-all-type-user_details', data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  setDashboardData(data: any) {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/get-dashboard-counts', data, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }

  getTaskDistribution() {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/get-task-distribution', {}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  getComposition() {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/get-composition-of-claim-initiated', {}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  getColumnChart() {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/month-wise-claims-inspections', {}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  getSettledClaim() {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/average-days-to-settle-claim', {}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  getTopUserByActivity() {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/top-users-by-claim-activity', {}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  getMonthlyRevenue() {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/get-revenue-and-new-client-reg', {}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  };
  getUserLogout(data: any) {
    this.http.post('https://dev-api.icgms.sharajman.com/logout', data)
  }

  initiateNewProcess() {
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/get-products', {}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  initiateNewInsurer(product_id: any) {
   let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/get-insurer', { product_id: product_id }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }

  getDynamicForm(product_id:any,insurer_id:any) {
   
    let token = localStorage.getItem('loginToken')
    return this.http.post('https://dev-api.icgms.sharajman.com/get-dynamic_form', {product_id:product_id,insurer_id:insurer_id,step:0}, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
  }
  addClaim(formData:any){
  
    let token=localStorage.getItem('loginToken');
    return this.http.post('https://dev-api.icgms.sharajman.com/add-claim',formData,{
      headers:{
        'Content-Type': 'application/json',
        'authorization':`Bearer ${token}`
      }
    })
  }
  // getAllClaimList(){
  //   let token = localStorage.getItem('loginToken')
  //   return this.http.post('https://dev-api.icgms.sharajman.com/get_all_claim_list',{ }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'authorization': `Bearer ${token}`
  //     }
  //   })
  // }



}
