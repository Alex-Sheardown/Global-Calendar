import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {CalendarService} from "../service/calendar.service";
import {switchMap} from "rxjs/operators";
import {Calendar} from "../interface/calendar";
import {forkJoin, Observable} from "rxjs";
import {Event} from "../interface/event";
import {EventService} from "../service/event.service";
import {LogService} from "../log.service";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {

  private calendar$: Observable<Calendar> = new Observable<Calendar>();
  private event$: Observable<Event> = new Observable<Event>();
  private events$: Observable<Event[]> = new Observable<Event[]>();
  public eventArray: Event[] = [];

  constructor(
    private calendarService: CalendarService,
    private eventService: EventService,
    private logger: LogService,
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.getApplicableEvents(this.loginService.getCID())
    this.loadCalendar()
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    droppable: true,
    events: [],
    eventColor: 'lime',
    eventTextColor: 'black'
  }

  getApplicableEvents(calendarId: number): void {
    this.calendar$ = this.calendarService.getCalendarById(calendarId);
    this.events$ = this.calendar$.pipe(
      switchMap((calendar: Calendar) => {
        const eventArray$: Observable<Event>[] = [];
        calendar.events.forEach(event => {
          this.event$ = this.eventService.getEventByIdObs(event.eventId);
          eventArray$.push(this.event$);
        })
        return forkJoin(eventArray$)
      })
    )
  }

  loadCalendar(): any{
    let calEventArray: Event[] = []
    this.events$.subscribe(response =>{
      this.eventArray = response;
      for(let i = 0; i < this.eventArray.length; i ++){
        calEventArray.push(this.eventConversion(this.eventArray[i]));
      }
      this.calendarOptions.events = calEventArray;
      this.logger.log('sending cal options')
      this.logger.log(this.calendarOptions)
    })
  }

  eventConversion(event: Event): any{
    return {title: event.title, start: this.timeConversion(event.startDate.slice(0,10), event.startTime), end: this.timeConversion(event.endDate.slice(0,10), event.endTime)}
  }

  timeConversion(date: string, time: string): string{
    return date + 'T' + time;
  }

}
