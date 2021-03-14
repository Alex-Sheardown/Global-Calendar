import { Component } from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment-timezone';

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
  title = 'Global Calendar';
  homeTimezone = moment.tz.guess()
  homeDateAndTime = moment().format('LLL Z');
  desiredTimezone = 'Asia/Tokyo'; //placeholder
  convertedDateAndTime = moment.tz(this.desiredTimezone).format('LLL Z');
  tempID

  //constructor(private router: Router,) { }
  constructor(private router: Router, private http:HttpClient, private loginService: LoginService) { 

    let hold = ""
    this.loginService.getTemp1().subscribe(value => hold)
    //this.saveInLocal('AC', hold);
    this.loginService.getTemp2().subscribe(value => hold)
    //this.saveInLocal('ID', hold);
    this.tempID = hold

  }

  changeDesiredTimezone(timezone: string) {
    this.desiredTimezone = timezone;
    this.convertedDateAndTime = moment.tz(this.desiredTimezone).format('LLL Z');
  }

  // Views
  goToDayView() {this.router.navigate(['day']);}
  goToWeekView() {this.router.navigate(['week']);}
  goToMonthView() {this.router.navigate(['month']);}
  //goToYearView() {this.router.navigate(['year']);}
  goToSchedule() {this.router.navigate(['schedule']);}
  goToSettings() {this.router.navigate(['settings']);}

  // Temporary routes for testing
  clickGetCalendars() {this.router.navigate(['calendar']);}
  clickGetEvents() {this.router.navigate(['event']);}
  clickGetUsers() {this.router.navigate(['user']);}
  clickGoToSignIn() {this.router.navigate(['signin']);}

}
