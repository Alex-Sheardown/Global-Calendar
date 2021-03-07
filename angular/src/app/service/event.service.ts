import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event} from "../interface/event";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class EventService {

  url:string = 'http://localhost:8080/app/event'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private logger: LogService) { }

  postEvent() {
    return this.http.request('POST', this.url, {
      // placeholder
      body: {
        "eventId": 9,
        "title": "Professor H GME Investment Zoom Meeting",
        "category": "Classes",
        "description": "To the moon!",
        "startDate": "2021-02-13T00:00:00.000Z",
        "endDate": "2021-02-13T00:00:00.000Z",
        "startTime": "13:00",
        "endTime": "14:30"
      }
    }).subscribe();
  }

  deleteEvent(eventId: number) {
    return this.http.request('DELETE', this.url, {body: {"eventId": eventId}}).subscribe();
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  getEventById(index: string) {
    return this.http.get(this.url + '/' + index + '').pipe(map((response: any) => response.json()));
  }
}
