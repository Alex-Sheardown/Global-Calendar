import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EventListComponent} from "../event-list/event-list.component";
import {CalendarService} from "../service/calendar.service";
import {FormControl} from "@angular/forms";
import { LoginService } from '../service/login.service';
import { Calendar } from '../interface/calendar';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit, OnChanges {
  calendar$: any;
  ngOnChanges(changes: SimpleChanges) {
    this.pullCalendarData(this.calendarNumber);
  }

  public UserName = ""
  public selectedDate = new Date();
  public calendarNumber= 1;
  public calendarName: string = 'Hello I exist';
  userID: number

  constructor(
    private calendarService: CalendarService, private loginService: LoginService) {
      this.userID = this.loginService.getID()
      this.UserName = this.loginService.getName()
      this.getCalendarById(this.userID)
      this.calendarNumber = this.loginService.getCID()
      //this.calendarName = this.loginService.getCN()
      this.pullCalendarData(this.calendarNumber);
  }

  ngOnInit(): void {
    this.selectedDate.setHours(0);
  }

  //need pull by user id
  getCalendarById(userId: number) {
    this.calendar$ = this.calendarService.getCalendarById(userId);
    this.calendar$.subscribe((result: Calendar) => {
      this.loginService.setCID(result.calendarId);
      this.calendarNumber = result.calendarId;
      this.calendarName = result.name;
      
    })
  }
  

  pullCalendarData(calendarId: number): void{
    this.calendarService.getCalendarById(calendarId).subscribe( response => {
      //this.calendarName = response.name;
      this.calendarNumber = response.calendarId;
      this.loginService.setCID(this.calendarNumber);
    });

  }

}
