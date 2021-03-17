import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../interface/user";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class UserService {

  url:string = 'https://globalcaal.azurewebsites.net/app/user/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private logger: LogService) {}

  postUser(){
    return this.http.request('POST', this.url, {
      //placeholder
      body: {
        "name": "Mr.Bob",
        "userId": 6,
        "timeZone":"USA/Los_Angeles" ,
        "desiredTimeZone":"USA/New_York" ,
        "startDate": "2020-01-01",
        "endDate": "2021-12-31",
        "isActive": "true"
      }
    }).subscribe();
  }

  deleteUser(userId: number){
    return this.http.request('DELETE', this.url, {body: {"userId": userId}}).subscribe();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUserById(userId: number) : Observable<User> {
    return this.http.get<User>(this.url + userId + ''); //user observable. passing the observable.
  }

  updateDesiredTimeZone(userId: number, dTZ: string) {
    return this.http.request('PUT', this.url, {
      body: {
        "userId":  {
          "userId": userId
        },
        "document": {
          "desiredTimeZone": dTZ
        }
      }
    }).subscribe();
  }

}
