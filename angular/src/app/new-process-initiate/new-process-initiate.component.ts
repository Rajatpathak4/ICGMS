import { Component, OnInit } from '@angular/core'; 
import { FirstServiceService } from '../service/first-service.service';
import { Router } from '@angular/router'; // Import Router for navigation
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-new-process-initiate', 
  templateUrl: './new-process-initiate.component.html', 
  styleUrls: ['./new-process-initiate.component.css'] 
})
export class NewProcessInitiateComponent implements OnInit { 
  myform:FormGroup
  productData: any;  
  insurerData: any;  
  showSpinner: boolean = true; 
  selectedProduct: any; 
  selectedInsurer: any; 
  motorFormData:any; 
  formTitle: any;
  formData: any; 
  form_id: any;  
  insurer_id: any;
  product_id: any;

  constructor(public userDetail: FirstServiceService, private _router: Router, private fb: FormBuilder) {
    this.myform = new FormGroup({
      customer_email: new FormControl('', [Validators.required, Validators.email]),
      customer_mobile_no: new FormControl('', [Validators.required]),
      policy_number: new FormControl('', [Validators.required]),
      policy_from: new FormControl('', [Validators.required]),
      policy_to: new FormControl('', [Validators.required]),
      customer_name: new FormControl('', [Validators.required]),
      make: new FormControl(''),
      model: new FormControl(''),
      type: new FormControl(''),
      color: new FormControl(''),
      regnumber: new FormControl(''),
      mfgyear: new FormControl(''),
    });
  }

  ngOnInit() {
    this.loadNewProcess(); 
  }

  loadNewProcess() {
    this.showSpinner = true; 
    this.userDetail.initiateNewProcess().subscribe((response: any) => {
      this.productData = response; // Store response data in productData
      this.showSpinner = false; // Hide the loading spinner after data is received
    });
  }

  loadNewInsurer(productId: any) {
    this.product_id = productId; // Assign the passed product ID to product_id variable
    this.userDetail.initiateNewInsurer(productId).subscribe((response: any) => {
      this.insurerData = response;
    });
  }

  loadInsurerDetails(insurerId: any) {
    this.selectedInsurer = insurerId; // Set the selected insurer
    this.insurer_id = insurerId; // Dynamically set the insurer_id
    console.log('Selected Insurer ID:', this.insurer_id);
    this.getTheForm();
  }

  getTheForm() {
    if (!this.selectedProduct || !this.selectedInsurer) {
      console.log('Please select both product and insurer first.');
      return;
    }
    this.userDetail.getDynamicForm(this.selectedProduct, this.selectedInsurer).subscribe((response: any) => {
      this.form_id = response.form_id; 
      this.motorFormData = response.data[0].data || []; // Store form data or empty array if not available
      this.formTitle = response.data[0].step_title || ' '; // Store form title or empty string if not available
    });
  }

  onSubmit() {
    this.myform.value['product_id'] = this.product_id; // Attach product ID to form data
    this.myform.value['form_id'] = this.form_id; // Attach form ID to form data
    this.myform.value['insurer_id'] = this.selectedInsurer; // Attach dynamically selected insurer ID to form data

    console.log(this.myform.value); 

    this.userDetail.addClaim(this.myform.value).subscribe((response: any) => {
      console.log(response);  
    });
  }
}
