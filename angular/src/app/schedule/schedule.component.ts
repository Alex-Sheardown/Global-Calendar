import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { EventService } from "../service/event.service";
import {forkJoin, Observable} from "rxjs";
import { LogService } from "../log.service";
import { Event } from "../interface/event";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import {getCalendar} from "@angular/material/datepicker/testing/datepicker-trigger-harness-base";
import {CalendarService} from "../service/calendar.service";
import {LoginService} from "../service/login.service";
import {switchMap} from "rxjs/operators";
import {Calendar} from "../interface/calendar";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnChanges{

  private calendar$: Observable<Calendar> = new Observable<Calendar>();
  private event$: Observable<Event> = new Observable<Event>();
  private events$: Observable<Event[]> = new Observable<Event[]>();
  public calendarName: string = '';

  displayedColumns: string[] = [
    'eventId', 'title', 'category', 'description',
    'startDate', 'startTime', 'endDate', 'endTime', 'action'
  ];
  dataSource = new MatTableDataSource<Event>();

  constructor (
    private eventService: EventService,
    private router: Router,
    private logger: LogService,
    private calendarService: CalendarService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.getCalendarEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCalendarEvents();
  }

  /*getEvents() {
    this.eventService.getEvents().subscribe((result: Event[]) => {
      this.dataSource = new MatTableDataSource<Event>(result);
    })
  }*/

  getCalendarEvents(): void {
    this.calendar$ = this.calendarService.getCalendarByUserId(this.loginService.getID())
    this.events$ = this.calendar$.pipe(
      switchMap((calendar: Calendar) => {
        this.calendarName = calendar.name;
        const eventArray$: Observable<Event>[] = [];
        calendar.events.forEach(event=>{
          this.event$ = this.eventService.getEventByIdObs(event.eventId);
          eventArray$.push(this.event$);
        })
        return forkJoin(eventArray$)
      })
    )
    this.events$.subscribe((result: Event[]) => {
      this.dataSource = new MatTableDataSource(result);
    })
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId);
  }

  goToManageEvents() {this.router.navigate(['schedule/manage']);}
}
