import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CrudUserService {
  usersRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  userRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase,  
    ) { }

  // Create Student
  AddUser(user: User) {
    this.usersRef.push({
      userName: user.userName,
      password: user.password,
      role: user.role,

     
    })
  }

  // Fetch Single Student Object
  GetBook(id: string) {
    this.userRef = this.db.object('users-list/' + id);
    return this.userRef;
  }
  GetUserByUser(user: string) {
    this.userRef = this.db.object('users-list/'+ user);
    return this.userRef;
  }
  // Fetch Students List
  GetUserist() {
    this.usersRef = this.db.list('users-list');
    return this.usersRef;
  }  

  // Update Student Object
  UpdateBook(user: User) {
    this.userRef.update({
      userName: user.userName,
      password: user.password,
     
    })
  }  

  // Delete Student Object
  DeleteBook(id: string) { 
    this.userRef = this.db.object('users-list/'+id);
    this.userRef.remove();
  }
}
