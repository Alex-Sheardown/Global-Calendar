import { Component } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Global Calendar';

  constructor(private router: Router,) { }

  clickGetCalendars() {
    this.router.navigate(['calendar'])
  }

  clickGetEvents() {
    this.router.navigate(['event']);
  }

}
