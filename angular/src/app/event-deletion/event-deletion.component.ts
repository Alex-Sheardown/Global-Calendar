import { Component, OnInit } from '@angular/core';
import {EventService} from "../service/event.service";
import {Observable} from "rxjs";
import {Event} from "../interface/event";

@Component({
  selector: 'app-event-deletion',
  templateUrl: './event-deletion.component.html',
  styleUrls: ['./event-deletion.component.css']
})
export class EventDeletionComponent implements OnInit {

  public events$: Observable<Event[]> = new Observable<Event[]>();
  public events: Event[] | undefined;
  public selectedEvent: any;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe((result: Event[]) => {
      this.events = result;
    })
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.selectedEvent.eventId);
  }

}
