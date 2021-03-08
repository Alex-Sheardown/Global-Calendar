import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventService} from "../service/event.service";
import {LogService} from "../log.service";
import {Event} from "../interface/event";
import {MatTableDataSource} from "@angular/material/table";
import {CalendarService} from "../service/calendar.service";
import {Calendar} from "../interface/calendar";
import {forkJoin, Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnChanges {
  @Input() datePicker: any;
  @Input() calendarPicker: any;

  ngOnChanges(changes: SimpleChanges) {
    this.getApplicableDates(this.datePicker);
    this.getApplicableEvents(this.calendarPicker);
  }

  private calendar$: Observable<Calendar> = new Observable<Calendar>();
  private event$: Observable<Event> = new Observable<Event>();
  private events$: Observable<Event[]> = new Observable<Event[]>();
  public calendarName: string = '';

  // For MatTable
  displayedColumns: string[] = ['category', 'title', 'description', 'startTime', 'endTime'];
  dataSource: any;

  constructor(
    private eventService: EventService,
    private calendarService: CalendarService,
    private logger: LogService
  ) {
    }


  ngOnInit(): void {
    this.getApplicableEvents(this.calendarPicker);
  }

  getApplicableEvents(calendarId: number): void {
    this.calendar$ = this.calendarService.getCalendarById(calendarId);
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
    this.getApplicableDates(this.datePicker)
  }

  getApplicableDates(date: Date): void {
    this.events$.subscribe((result: Event[]) => {
      let unpacked: Event[] = [];
      result.forEach(event=>{
        let theDate = new Date(event.startDate);
        if(this.eventService.convertDateObjToString(theDate).slice(0,10) == this.eventService.convertDateObjToString(date).slice(0,10)){
          unpacked.push(event)
        }
      })
      this.dataSource = new MatTableDataSource(unpacked);
    })
  }

}
