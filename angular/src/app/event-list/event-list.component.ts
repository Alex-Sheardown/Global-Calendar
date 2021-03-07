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
  ngOnChanges(changes: SimpleChanges) {
    this.getApplicableDates(this.datePicker);
  }

  private calendar$: Observable<Calendar> = new Observable<Calendar>();
  private event$: Observable<Event> = new Observable<Event>();
  private events$: Observable<Event[]> = new Observable<Event[]>();

  // For MatTable
  displayedColumns: string[] = ['category', 'title', 'description', 'startTime', 'endTime'];
  dataSource: any;

  constructor(
    private eventService: EventService,
    private calendarService: CalendarService,
    private logger: LogService
  ) {
      this.calendar$ = this.calendarService.getCalendarById(1);
    }


  ngOnInit(): void {
    this.getApplicableEvents();
    this.getApplicableDates(this.datePicker);
  }

  getApplicableEvents(): void {
    this.events$ = this.calendar$.pipe(
      switchMap((calendar: Calendar) => {
        const eventArray$: Observable<Event>[] = [];
        calendar.events.forEach(event=>{
          this.event$ = this.eventService.getEventByIdObs(event.eventId);
          eventArray$.push(this.event$);
        })
        return forkJoin(eventArray$)
      })
    )
  }

  getApplicableDates(date: Date): void {
    this.events$.subscribe((result: Event[]) => {
      let unpacked: Event[] = [];
      result.forEach(event=>{
        let theDate = new Date(event.startDate);
        if(this.eventService.convertDateObjToString(theDate) == this.eventService.convertDateObjToString(date)){
          unpacked.push(event)
        }
      })
      this.dataSource = new MatTableDataSource(unpacked);
    })
  }

}
