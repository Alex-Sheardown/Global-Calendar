import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment-timezone';
import { User } from './interface/user';

//test
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {LoginService} from './service/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  userid = null;
  title = 'Global Calendar';
  //should be more dynamic
  homeTimezone = this.loginService.getTZ();
  homeDateAndTime = moment().format('LLL Z');
  desiredTimezone = this.loginService.getDTZ(); //placeholder
  convertedDateAndTime = moment.tz(this.desiredTimezone).format('LLL Z');
  userID;
  user$: any;

  constructor(private router: Router, private loginService: LoginService) {
    //This UserID needs to be udated
    this.userID = loginService.getID();
    console.log("hello")
    this.getUserById();
  }

  getUserById(): void {
    console.log(this.userID)
      this.user$ = this.loginService.getUser(this.userID); //this calls from service, and service calls from backend.
      this.user$.subscribe((result: User) => {
      //create variables:
      this.loginService.setName(result.name);
      console.log("I exist");
      this.loginService.setTZ(result.timeZone);
      this.homeTimezone = this.loginService.getTZ()
    })
  }

  changeDesiredTimezone(timezone: string) {
    this.desiredTimezone = timezone;
    this.convertedDateAndTime = moment.tz(this.desiredTimezone).format('LLL Z');
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

  // Views
  goToDayView() {this.router.navigate(['day']);}
  goToWeekView() {this.router.navigate(['week']);}
  goToMonthView() {this.router.navigate(['month']);}
  goToSchedule() {this.router.navigate(['schedule']);}
  goToSettings() {this.router.navigate(['settings']);}

  // Temporary routes for testing
  /*clickGetCalendars() {this.router.navigate(['calendar']);}
  clickGetEvents() {this.router.navigate(['event']);}
  clickGetUsers() {this.router.navigate(['user']);}
  clickGoToSignIn() {this.router.navigate(['signin']);}*/

}
