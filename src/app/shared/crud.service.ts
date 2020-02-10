import { Injectable } from '@angular/core';
import { Book } from './book';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  booksRef: AngularFireList<any>;    // Reference to Student data list, its an Observable
  bookRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create Student
  AddBook(book: Book) {
    this.booksRef.push({
      bookName: book.bookName,
      picture: book.picture,
     
    })
  }

  // Fetch Single Student Object
  GetBook(id: string) {
    this.bookRef = this.db.object('books-list/' + id);
    return this.bookRef;
  }

  // Fetch Students List
  GetBookList() {
    this.booksRef = this.db.list('books-list');
    return this.booksRef;
  }  

  // Update Student Object
  UpdateBook(book: Book) {
    this.bookRef.update({
      bookName: book.bookName,
      picture: book.picture,
     
    })
  }  

  // Delete Student Object
  DeleteBook(id: string) { 
    this.bookRef = this.db.object('books-list/'+id);
    this.bookRef.remove();
  }
}
