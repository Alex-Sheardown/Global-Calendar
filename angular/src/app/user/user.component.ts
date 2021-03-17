import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service'
import { LogService } from "../log.service";
import { User } from "../interface/user";
import { Observable } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  public users$: Observable<User[]> = new Observable<User[]>();
  public userList: User[] | undefined
  public user$: Observable<User> = new Observable<User>();

  public editUser: User | undefined; //the user currently being edited
  public inputUser: number | undefined;

  //variables all in user model
  public v_name: string = '';
  public v_userId: number | undefined;
  public v_timeZone: string = '';
  public v_dTimeZone: string = '';
  public v_startDate: string = '';
  public v_endDate: string = '';
  public v_isActive: boolean | undefined;
  public v_email: string = '';

  userID;

    constructor(
      private userService: UserService,
      private logger: LogService,
      private loginService: LoginService) {

      this.userID = loginService.getID()
      this.users$ = this.userService.getUsers()
      this.users$.subscribe(x => {
      this.userList = x

      this.getUserById()
  })
};

ngOnInit() { }

createUser(): void {
  this.userService.postUser();
}

deleteUser(userId: number){
  console.log(userId)
  this.userService.deleteUser(userId)
}

getUserById(): void {
  console.log(this.userID)
    this.user$ = this.userService.getUserById(this.userID); //this calls from service, and service calls from backend.
    this.user$.subscribe((result: User) => {
    this.editUser = result;
    //create variables:
    this.v_name = result.name;
    this.v_userId = result.userId;
    this.v_timeZone = result.timeZone;
    this.v_dTimeZone = result.desiredTimeZone;
    this.v_startDate = result.startDate;
    this.v_endDate = result.endDate;
    this.v_isActive = result.isActive;
    this.v_email = result.email;
    this.loginService.setName(this.v_name);
  })
}

/*
getUserById(userId: number): void {
  console.log(userId)
    this.user$ = this.userService.getUserById(userId); //this calls from service, and service calls from backend.
    this.user$.subscribe((result: User) => {
    this.editUser = result;
    //create variables:
    this.v_name = result.name;
    this.v_userId = result.userId;
    this.v_timeZone = result.timeZone;
    this.v_startDate = result.startDate;
    this.v_endDate = result.endDate;
    this.v_isActive = result.isActive;

  })
}
*/

}

// this.events$.subscribe((result: Event[]) => {
//   this.eventList = result;
// })
