// import { Injectable } from '@angular/core';
// import {HttpHeaders} from "@angular/common/http";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//
//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//   constructor() { }
// }
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../interface/user";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LogService
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/app/user/');
  }

  getUserById(index: string) {
    return this.http.get('http://localhost:8080/app/user/' + index + '').pipe(map((response: any) => response.json()));
  }

  /**POST: Add a new user*/
  addUser(user: User){
    return this.http.post('http://localhost:8080/app/user/', user, this.httpOptions);
  }
  // addUser(user : User){
  //   return this.http.post(this._baseUrl + '/API/identity/user',user,{ headers: headers}).map((response: Response) =>{
  //     console.log (response.json());
  //   })
  // }

}
