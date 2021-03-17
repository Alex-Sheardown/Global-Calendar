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

  ngOnInit(): void {  }

  getUser(userId: number) {
    console.log(userId);
    this.user$ = this.loginService.getUser(userId);
    this.user$.subscribe((result: User) => {
      this.user = result;
      this.userName = result.name;
    })
  }

}
