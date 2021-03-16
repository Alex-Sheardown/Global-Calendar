import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarService} from "../service/calendar.service";
import {switchMap} from "rxjs/operators";
import {Calendar} from "../interface/calendar";
import {forkJoin, Observable} from "rxjs";
import {Event} from "../interface/event";
import {EventService} from "../service/event.service";
import {LogService} from "../log.service";
import { CalendarOptions } from '@fullcalendar/angular';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit {

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
    this.toggleSwitch()
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    eventClick: function(info) {
      alert (
        "Event Details:" + '\n' +
        "------------------------" + '\n' +
        info.event.title + '\n' +
        info.event.start + '\n' +
        info.event.end);
    }
  };

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

  toggleSwitch():void{
    this.calendarOptions.initialView = 'timeGridWeek'
  }
}
