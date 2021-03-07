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

  url:string = 'http://localhost:8080/app/user/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LogService
  ) {}


  /**GET: get all users**/
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  /**GET: get a user by ID**/
  getUserById(index: string) {
    return this.http.get(this.url + index + '').pipe(map((response: any) => response.json()));
  }

  /**DELETE: Delete user by ID**/
  deleteUser(userId: number){
    return this.http.request('DELETE', this.url, {body: {"userId": userId}}).subscribe();
  }


  // /**POST: Add a new user*/
  // addUser(user: User){
  //   return this.http.post(this.url, user, this.httpOptions);
  // }
  // addUser(user : User){
  //   return this.http.post(this._baseUrl + '/API/identity/user',user,{ headers: headers}).map((response: Response) =>{
  //     console.log (response.json());
  //   })
  // }

}
