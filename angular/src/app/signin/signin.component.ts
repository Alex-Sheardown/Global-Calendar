import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import {LoginService} from '../service/login.service';
import { Observable } from 'rxjs';
import{User} from '../interface/user';
//import {LogService} from "../log.service";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  
  public user$ : Observable<User> = new Observable<User>();
  public user: User | undefined; 
  public userName: String = "";

  
  constructor(private loginService: LoginService) { }

    
  //constructor() { }

  ngOnInit(): void {
  }
  
  getUser1(userId: number) {
    console.log(userId);
    //console.log("The signin ts is being called");
    this.user$ = this.loginService.getUser1(userId);
    this.user$.subscribe((result: User) => {
      this.user = result;
      this.userName = result.name;
    })
  }
  
  getUser2(userId: number, name: String) {
    console.log(userId);
    console.log(name);
    console.log("The signin ts is being called");
    this.user$ = this.loginService.getUser2(userId , name);
    this.user$.subscribe((result: User) => {
      this.user = result;
      this.userName = result.name;
    })
  }

  test(){
    console.log("The signin ts is being called with test Button");
  }
  
}
