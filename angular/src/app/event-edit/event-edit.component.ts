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

  validTimes: string[] = [
    "00:00", "01:00", "02:00", "03:00", "04:00", "05:00",
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
  ]

  public events$: Observable<Event[]> = new Observable<Event[]>();
  public events: Event[] | undefined;
  public selectedEvent: Event | any;
  public selectedStartDate = new Date();
  public selectedEndDate = new Date();
  public selectedStartTime = '';
  public selectedEndTime = '';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe((result: Event[]) => {
      this.events = result;
    })
    this.selectedStartDate.setHours(0);
    this.selectedEndDate.setHours(0);
  }

  editEvent(title: string, description: string, category: string) {
    this.eventService.updateEvent(
      this.selectedEvent.eventId, title, description, category,
      this.selectedStartDate, this.selectedEndDate,
      this.selectedStartTime, this.selectedEndTime
    );
  }
}
