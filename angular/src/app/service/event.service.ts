import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event} from "../interface/event";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class EventService {

  url:string = 'http://localhost:8080/app/event/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private logger: LogService) { }

  /*postEvent() {
    return this.http.post(this.url, this.httpOptions);
  }

  deleteEvent(eventId: number) {
    return this.http.delete(this.url + eventId).pipe(map((response: any) => response.json()));
  }*/

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url);
  }

  getEventById(index: string) {
    return this.http.get(this.url + index + '').pipe(map((response: any) => response.json()));
  }
}
