import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service'
import {LogService} from "../log.service";
import {User} from "../interface/user";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {

  public users$: Observable<User[]>
  public userList: User[] | undefined

  //editUser: User | undefined; //the user currently being edited

  // For Mat Table
  displayedColumns: string[] = ['userId', 'name', 'timeZone', 'isActive'];
  dataSource = new MatTableDataSource<User>();

  constructor(private userService: UserService, private logger: LogService) {
    this.users$ = this.userService.getUsers()
    this.users$.subscribe(result => {
      this.userList = result
      this.dataSource = new MatTableDataSource<User>(this.userList);
    })
  };

  ngOnInit() { }

  createUser(): void {
    this.userService.postUser();
  }

  deleteUser(userId: number) {
    console.log(userId)
    this.userService.deleteUser(userId)
  }

  /*getUserById(userId: number) {
    this.user$ = this.userService.getUserById(userId);
    this.user$.subscribe(result => {
      this.userById = result;
    });
  }*/
}

