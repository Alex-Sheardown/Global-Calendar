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

  public events$: Observable<Event[]>;
  public eventList: Event[] | undefined;
  public eventListByDate: Event[] | undefined;
  public inputDate: string = '';


  constructor(
    private eventService: EventService,
    private logger: LogService
  ) {
    this.events$ = this.eventService.getEvents();
    this.events$.subscribe(result => {
      this.eventList = result
    })
  };

  ngOnInit(): void {}

  // createEvent(){};
  // deleteEvent(){};

  getEventsByStartDate(date: string) {
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

        // For comparing entire string input, not character by character
        /*if (this.eventList[i].startDate == this.inputDate) {
          this.eventListByDate.push(this.eventList[i]);
        }*/
      }
    }
  }
}

