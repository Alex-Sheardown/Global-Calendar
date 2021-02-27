import { Component } from '@angular/core';
import { Router} from "@angular/router";
import * as moment from 'moment-timezone'; // for timezone component
//import * as moment from 'moment';        // moment without timezone

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Global Calendar';
  homeTimezone = moment.tz.guess()
  homeDateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  desiredTimezone = 'Asia/Tokyo'; //placeholder
  convertedDateAndTime = moment.tz(this.desiredTimezone).format('MMMM Do YYYY, h:mm:ss a');

  constructor(private router: Router,) { }

  goToMonthView() {
    this.router.navigate(['month']);
  }

  // Temporary routes
  clickGetCalendars() {
    this.router.navigate(['calendar']);
  }

  clickGetEvents() {
    this.router.navigate(['event']);
  }

}
