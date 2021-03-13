import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../interface/user";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class UserService { //TODO: To Azure

  // url:string = 'http://localhost:8080/app/user/'
  hostURL: string =  '/';
  pathURL: string = 'app/user';


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private logger: LogService) {}

  postUser(){
    return this.http.request('POST', this.hostURL + this.pathURL, {
      //placeholder
      body: {
        "name": "Mr.Bob",
        "userId": 6,
        "timeZone":"USA/Los_Angeles" ,
        "startDate": "2020-01-01",
        "endDate": "2021-12-31",
        "isActive": "true"
      }
    }).subscribe();
  }

  deleteUser(userId: number){
    return this.http.request('DELETE', this.hostURL + this.pathURL, {body: {"userId": userId}}).subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.hostURL + this.pathURL);
  }

  /**GET: get a user by ID**/
  getUserById(userId: number) : Observable<User> {
    return this.http.get<User>(this.hostURL + this.pathURL + userId + ''); //user observable. passing the observable.
  }

}
// export class UserService {

//   url:string = 'http://localhost:8080/app/user/'
//   hostURL: string =  '/';
//   pathURL: string = 'app/user';


//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };

//   constructor(private http: HttpClient, private logger: LogService) {}

//   postUser(){
//     return this.http.request('POST', this.url, {
//       //placeholder
//       body: {
//         "name": "Mr.Bob",
//         "userId": 6,
//         "timeZone":"USA/Los_Angeles" ,
//         "startDate": "2020-01-01",
//         "endDate": "2021-12-31",
//         "isActive": "true"
//       }
//     }).subscribe();
//   }

//   deleteUser(userId: number){
//     return this.http.request('DELETE', this.url, {body: {"userId": userId}}).subscribe();
//   }

//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.url);
//   }

//   /**GET: get a user by ID**/
//   getUserById(userId: number) : Observable<User> {
//     return this.http.get<User>(this.url + userId + ''); //user observable. passing the observable.
//   }

// }
