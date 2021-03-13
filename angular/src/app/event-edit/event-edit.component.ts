import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Event} from "../interface/event";
import {EventService} from "../service/event.service";

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  public events$: Observable<Event[]> = new Observable<Event[]>();
  public events: Event[] | undefined;
  public selectedEvent: Event | any;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe((result: Event[]) => {
      this.events = result;
    })
  }

  /*editEvent() {

  }*/
}
