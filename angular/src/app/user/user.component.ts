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
  };

  ngOnInit(): void {
    this.users$.subscribe(x => {
      this.userList = x
    })
  }

  // POST REQUEST ATTEMPT
  // addUser(name: string ): void {
  //   this.editUser = undefined;
  //   name = name.trim();
  //   if (!name) {
  //     return;
  //   }
  //
  //
  //   // The server will generate the id for this new hero
  //   const newUser: User = { name } as User;
  //   this.userService
  //     .addUser(newUser)
  //     .subscribe(user => this.userList.push(user));
  // }
  // createUser() : void{
  //   this.userService.addUser(newUser).subscribe( user => {alert("Succesfully Added Product details")},Error => {alert("failed while adding product details")})
  // }
}
//
// const val = this.form.value;
//
// this.http.post('url', {
//   first_name: val.first_name,
//   last_name: val.last_name,
//   email: val.email,
// })
//   .subscribe(response => {
//
//   });
