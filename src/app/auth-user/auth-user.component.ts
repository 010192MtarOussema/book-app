import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudUserService } from '../shared/crud-user.service';
import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';
import { Role } from '../shared/role';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.css']
})
export class AuthUserComponent implements OnInit {
  public userForm: FormGroup;  // Define FormGroup to student's form
users : Array<User> ; 
user : User ; 
p: number = 1;                      // Settup up pagination variable
hideWhenNoStudent: boolean = false; // Hide students data table when no student.
noData: boolean = false;            // Showing No Student Message, when no student in database.
preLoader: boolean = true; 
  constructor( public fb: FormBuilder,private crudUser : CrudUserService ,    public toastr: ToastrService,
    private router: Router,   ) {

     }

  ngOnInit() {
    this.studenForm();
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudUser.GetUserist(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.users = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.users.push(a as User);
      })
    })   
  }
  studenForm() {
    this.userForm = this.fb.group({
      userName: [''],
      password: [''],
      
      
    
    })  
  }

  // Accessing form control using getters
  get userName() {
    return this.userForm.get('userName');
  }

  get password() {
    return this.userForm.get('password');
  }  
  dataState() {     
    this.crudUser.GetUserist().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  onSubmit(user) {
    console.log(this.users)
    console.log("salut")
    // console.log(user.$key)
    this.users.forEach(u=>{
      
      if(u.userName === this.userForm.controls['userName'].value 
            && u.password === this.userForm.controls['password'].value
            ){
              console.log("hhhhhhhhhhhh" , u)
              this.crudUser.GetUserByUser(u.$key).valueChanges().subscribe(data=>{
                this.user = data  ; 

                if(data.role === Role.ADMIN){
                  this.router.navigate(['register-book']);  

                }else{
                  this.router.navigate(['view-books']);  
                }
                console.log("" , data)
              })

            }



   
    })
    // this.crudUser.GetUser(this.userForm.controls['userName'].value).valueChanges().subscribe(data=>{
    //   console.log(data)
    // }) 

    // this.crudUser.GetUserist().valueChanges().subscribe(
    //   data=>{
    //     console.log(data)
    //     this.users = data ; 
    //     this.users.forEach(user=>{
    //       if(user.userName === this.userForm.controls['userName'].value 
    //       && user.password === this.userForm.controls['password'].value
    //       && user.role === Role.CLIENT){
    //         // this.toastr.success(this.userForm.controls['userName'].value + ' successfully authentificate !');
    //          // Show success message when data is successfully submited
    //          this.router.navigate(['register-book']);  

    //       }else if (user.userName === this.userForm.controls['userName'].value 
    //       && user.password === this.userForm.controls['password'].value
    //       && user.role === Role.ADMIN){
    //         // this.toastr.success(this.userForm.controls['userName'].value + ' successfully authentificate !');
    //         this.router.navigate(['view-books']);  

    //       }
    //       else  {
    //         this.toastr.error(this.userForm.controls['userName'].value + ' Invalid!'); // Show success message when data is successfully submited

    //       }
    //     })

    //   }
    // ) ; 

   
   };
   ResetForm() {
    this.userForm.reset();
  }  
}
