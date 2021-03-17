import {Component, OnInit} from '@angular/core';
import {EventService} from '../service/event.service'
import {LogService} from "../log.service";
import {Event} from "../interface/event";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  // Single event
  public event$: Observable<Event> = new Observable<Event>();
  public event: Event | undefined;
  public eventTitle: string = '';

  // Multiple events
  public events$: Observable<Event[]> = new Observable<Event[]>();
  public eventList: Event[] | undefined;
  public eventListByDate: Event[] | undefined;
  public inputDate: string = '';

  // For MatTable
  displayedColumns: string[] = ['eventId', 'title', 'startDate'];
  dataSource = new MatTableDataSource<Event>();

  constructor(private eventService: EventService, private logger: LogService) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe((result: Event[]) => {
      this.eventList = result;
    })
  }

  deleteEvent(eventId: number) {
    console.log(eventId);
    this.eventService.deleteEvent(eventId)
  }

  getOneEvent(eventId: number) {
    console.log(eventId);
    this.event$ = this.eventService.getEventById(eventId);
    this.event$.subscribe((result: Event) => {
      this.event = result;
      this.eventTitle = result.title;
    })
  }

  getEventsByStartDate(date: string): void {
    console.log(date);
    this.eventListByDate = [];
    this.inputDate = date;
    if (this.eventList != undefined) {
      for (let i = 0; i < this.eventList.length; i++) {
        let isEqual: boolean = false;
        for (let j = 0; j < this.inputDate.length; j++) {
          if (this.eventList[i].startDate[j] != this.inputDate[j]) break;
          if (j == this.inputDate.length - 1) isEqual = true;
        }
        if (isEqual) this.eventListByDate.push(this.eventList[i]);
        this.dataSource = new MatTableDataSource<Event>(this.eventListByDate);
      }
    }
  }
}
