import { Component, OnInit } from '@angular/core';
import {EventService} from '../service/event.service'
import {LogService} from "../log.service";
import {Event} from "../interface/event";
import {Observable} from "rxjs";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public events$: Observable<Event[]>
  public eventList: Event[] | undefined

  constructor(
    private eventService: EventService,
    private logger: LogService
  ) {
    this.events$ = this.eventService.getEvents()
  };

  ngOnInit(): void {
    this.events$.subscribe(x => {
      this.eventList = x
    })
  }

}
