import {Component, Input, OnInit} from '@angular/core';
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

  public events$: Observable<Event[]> | undefined;
  public eventList: Event[] | undefined;
  public eventListByDate: Event[] | undefined;
  public inputDate: string = '';
  @Input ('eventId') eventId: any;

  // For MatTable
  displayedColumns: string[] = ['eventId', 'title', 'startDate'];
  dataSource = new MatTableDataSource<Event>();

  constructor(private eventService: EventService, private logger: LogService) {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe((result: Event[]) => {
      this.eventList = result;
    })
  }

  ngOnInit(): void { }

  /*createEvent(): void {
    this.eventService.postEvent();
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId);
  }*/

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

