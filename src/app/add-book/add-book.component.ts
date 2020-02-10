import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; 
import { CrudService } from '../shared/crud.service';
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  public bookForm: FormGroup;  // Define FormGroup to student's form
 
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

 
  ngOnInit() {
    this.crudApi.GetBookList();  // Call GetStudentsList() before main form is being called
    this.studenForm();              // Call student form when component is ready
  }

  // Reactive student form
  studenForm() {
    this.bookForm = this.fb.group({
      bookName: ['', [Validators.required, Validators.minLength(2)]],
      picture: [''],
      // email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      // mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })  
  }

  // Accessing form control using getters
  get bookName() {
    return this.bookForm.get('bookName');
  }

  get picture() {
    return this.bookForm.get('picture');
  }  

  // get email() {
  //   return this.studentForm.get('email');
  // }

  // get mobileNumber() {
  //   return this.studentForm.get('mobileNumber');
  // }

  // Reset student form's values
  ResetForm() {
    this.bookForm.reset();
  }  
 
  submitStudentData() {
    this.crudApi.AddBook(this.bookForm.value); // Submit student data using CRUD API
    this.toastr.success(this.bookForm.controls['picture'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}
