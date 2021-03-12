import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import {CalendarService} from "../service/calendar.service";
import {switchMap} from "rxjs/operators";
import {Calendar} from "../interface/calendar";
import {forkJoin, Observable} from "rxjs";
import {Event} from "../interface/event";
import {EventService} from "../service/event.service";
import {LogService} from "../log.service";

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
    private logger: LogService
  ) {
  }

  ngOnInit(): void {
    this.getApplicableEvents(1)
    this.loadCalendar()
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    droppable: true,
    events: [],
    /*events: [
      { title: "Hank's Vet Appointment", start: '2021-03-09T12:00', end: "2021-03-09T12:00"},
      { title: "Presentation Preparation", start: '2021-03-09T16:00', end: "2021-03-09T18:00"},
      { title: "Capstone Zoom Meeting", start: '2021-03-09T11:00', end: "2021-03-09T13:00"},
      { title: "SaaS Zoom Meeting", start: '2021-03-09T18:00', end: "2021-03-09T20:00"},
      { title: "Group Project Meeting", start: '2021-03-09T14:00', end: "2021-03-09T17:00"},
    ]*/
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
