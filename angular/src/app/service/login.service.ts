import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
//import {LogService} from "../log.service";
import { Observable } from 'rxjs';
import{User} from '../interface/user'

export interface userId {
  userId: number
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  // url: string = "https://globalcal5.azurewebsites.net/app/user/"
  // url2: string = "https://globalcal5.azurewebsites.net/"

  hostURL:string = '/'
  pathURL:string = 'app/user/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public v_name: string = '';
  public v_userId: number;
  public v_timeZone: string = '';
  public v_dTimeZone: string = '';
  public v_startDate: string = '';
  public v_endDate: string = '';
  public v_isActive: boolean | undefined;
  public v_email: string = '';

  public v_calendarId: number = 0
  public v_calendarIdName: string = '';

  constructor(private http: HttpClient) {
    this.v_userId = 0;
  }

  getID():number{
    this.http.get<User>(this.hostURL + this.pathURL + 'current').subscribe((user: userId) => {
      this.v_userId = user.userId;
    })
    return this.v_userId
  }

  getName(){
    return this.v_name
  }

  setName(name : string){
    this.v_name = name
  }

  getTZ(): string{
    return this.v_timeZone
  }

  setTZ(name : string){
    this.v_timeZone = name
  }

  getDTZ(){
    return this.v_dTimeZone;
  }

  setDTZ(dTZ: string){
    this.v_dTimeZone = dTZ;
  }

  getCID():number{
    return this.v_userId;
  }

  setCID(id : number){
    this.v_calendarId = id
  }

  getCN(): string{
    return this.v_calendarIdName
  }

  setCN(name : string){
    this.v_calendarIdName = name
  }

  getUser(userId:number) : Observable<User> {
    return this.http.get<User>(this.hostURL + this.pathURL + userId + "");
  }

  getTemp1(): Observable<string>{
    return this.http.get<string>(this.hostURL + "CallOne");
  }

  getTemp2(): Observable<string>{
    return this.http.get<string>(this.hostURL + "CallTwo");
  }

  /*
  getUserByName(name: String, accessToken:String) : Observable<User> {
    //return this.http.get<User>(this.url + "/" + name + "",  accessToken);
  }
  */
}
