import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; 
import { Role } from '../shared/role';
import { CrudUserService } from '../shared/crud-user.service';
@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.css']
})
export class SignUpUserComponent implements OnInit {
  public userForm: FormGroup;  // Define FormGroup to student's form
 
  constructor(
    public crudApi: CrudUserService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

 
  ngOnInit() {
    this.studenForm();              // Call student form when component is ready
  }

  // Reactive student form
  studenForm() {
    this.userForm = this.fb.group({
      userName: [''],
      password: [''],
      role: [Role.CLIENT],
      
    
    })  
  }

  // Accessing form control using getters
  get userName() {
    return this.userForm.get('userName');
  }

  get password() {
    return this.userForm.get('password');
  }  
  get role() {
    return this.userForm.get('role');
  }  
  // get email() {
  //   return this.studentForm.get('email');
  // }

  // get mobileNumber() {
  //   return this.studentForm.get('mobileNumber');
  // }

  // Reset student form's values
  ResetForm() {
    this.userForm.reset();
  }  
 
  submitUserData() {
   console.log(this.userForm.value)
    this.crudApi.AddUser(this.userForm.value); // Submit student data using CRUD API
    this.toastr.success(this.userForm.controls['userName'].value + ' successfully added!'); 
    this.ResetForm(); 
   };

}
