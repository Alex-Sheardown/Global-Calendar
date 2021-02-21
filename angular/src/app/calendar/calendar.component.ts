import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../service/calendar.service'
import {LogService} from "../log.service";
import {Calendar} from "../interface/calendar";
import {Observable} from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public calendars$: Observable<Calendar[]>
  public calendarList: Calendar[] | undefined

  constructor(
    private calService: CalendarService,
    private logger: LogService
  ) {
    this.calendars$ = this.calService.getCalendars()
  };

  ngOnInit(): void {
    this.calendars$.subscribe(x => {
      this.calendarList = x
    })
  }

}
