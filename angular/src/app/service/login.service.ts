import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {LogService} from "../log.service";
import { Observable } from 'rxjs';
import{User} from '../interface/user'

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  url: string = "http://localhost:8080/app/user"
  url2: string = "http://localhost:8080/"
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  
  getUser(userId:number) : Observable<User> {
    return this.http.get<User>(this.url + "/" + userId + "");
  }

  getTemp1(): Observable<string>{
    return this.http.get<string>(this.url2 + "/CallOne");
  }

  getTemp2(): Observable<string>{
    return this.http.get<string>(this.url2 + "/CallTwo");
  }

  /*
  getUserByName(name: String, accessToken:String) : Observable<User> {
    //return this.http.get<User>(this.url + "/" + name + "",  accessToken);
  }
  */
}
