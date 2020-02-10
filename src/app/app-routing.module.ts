import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user/add-user.component';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth-user', pathMatch: 'full' },
  { path: 'auth-user', component: AuthUserComponent },
  // { path: 'register-book', component: AddBookComponent },
  { path: 'view-users', component: UserListComponent },

  { path: 'view-books', component: BookListComponent },
  { path: 'edit-book/:id', component: EditBookComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'register-book', component: AddBookComponent },
  { path: 'sign-up-user', component: SignUpUserComponent },


];
@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
