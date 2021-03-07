import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service'
import {LogService} from "../log.service";
import {User} from "../interface/user";
import {Observable} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  public users$: Observable<User[]>
  public userList: User[] | undefined

  editUser: User | undefined; //the user currently being edited

  constructor(
    private userService: UserService,
    private logger: LogService
  ) {
    this.users$ = this.userService.getUsers()
    this.users$.subscribe(x => {
      this.userList = x
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
}

