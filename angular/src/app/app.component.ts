import { Component, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from "@angular/router";
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userid = null;
  title = 'Global Calendar';
  homeTimezone = moment.tz.guess()
  homeDateAndTime = moment().format('LLL Z');
  desiredTimezone = 'Asia/Tokyo'; //placeholder
  convertedDateAndTime = moment.tz(this.desiredTimezone).format('LLL Z');

  constructor(private router: Router,) { }

  changeDesiredTimezone(timezone: string) {
    this.desiredTimezone = timezone;
    this.convertedDateAndTime = moment.tz(this.desiredTimezone).format('LLL Z');
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
