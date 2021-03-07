import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../interface/user";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

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

  /**POST: Post a user **/
  postUser(){
    return this.http.request('POST', this.url, {
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

  /**DELETE: Delete user by ID**/
  deleteUser(userId: number){
    return this.http.request('DELETE', this.url, {body: {"userId": userId}}).subscribe();
  }

  /**GET: get all users**/
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  /**GET: get a user by ID**/
  getUserById(index: string) {
    return this.http.get(this.url + index + '').pipe(map((response: any) => response.json()));
  }
}
