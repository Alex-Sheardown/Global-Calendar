import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from "@angular/forms";



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

  //@Input()  inputPassword: string;

  public user$ : Observable<User> = new Observable<User>();
  public user: User | undefined; 
  public userName: String = "";


  inputName: number;
  inputPassword = "NAN"; 

  
  constructor(private loginService: LoginService) { 
    this.inputName = 0;
    //inputPassword = "adfafafafd"; 
  }

  
  
 

  ngOnInit(): void {
  }
  
  


  //test

  getUser0() {
    console.log(this.inputName);
    //console.log("The signin ts is being called");
    this.user$ = this.loginService.getUser1(this.inputName);
    this.user$.subscribe((result: User) => {
      this.user = result;
      //this.userName = result.name;
      this.userName = this.inputPassword;
    })
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

  /*
  getUser3() {
    console.log(this.inputName);
    console.log(this._inputPassword);
    console.log("The signin ts is being called");
    this.user$ = this.loginService.getUser2(this._inputName, this._inputPassword);
    this.user$.subscribe((result: User) => {
      this.user = result;
      this.userName = result.name;
    })
  }
*/

  test(){
    console.log("The signin ts is being called with test Button");
  }
  
}
