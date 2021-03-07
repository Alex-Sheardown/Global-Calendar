import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {EventService} from "../service/event.service";
import {LogService} from "../log.service";
import {Event} from "../interface/event";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  public events$: Observable<Event[]>;
  public eventList: Event[] | undefined;

  // For MatTable
  displayedColumns: string[] = ['eventId', 'title', 'startDate'];
  dataSource = new MatTableDataSource<Event>();

  constructor(
    private eventService: EventService,
    private logger: LogService
  ) {
    this.events$ = this.eventService.getEvents()
  }

  ngOnInit(): void {
    this.events$.subscribe(x=>{
      this.eventList = x;
    })
    this.dataSource = new MatTableDataSource<Event>(this.eventList);
  }

}
