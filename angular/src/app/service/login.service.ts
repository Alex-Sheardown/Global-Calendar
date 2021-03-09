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
  url1: string = "http://localhost:8080/app/user/secure/login"
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getUser1(userId:number) : Observable<User> {
    return this.http.get<User>(this.url + "/" + userId + "");
  }
  
  getUser2(userId:number, name: String) : Observable<User> {
    console.log("getUser in loginService")
    return this.http.request<User>('get', this.url1 , {
      body:{
        'userId' : userId,
        'name' : name
      }
    });
  }
}


