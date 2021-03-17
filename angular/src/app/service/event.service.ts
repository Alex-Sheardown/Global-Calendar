import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from "../interface/event";
import { LogService } from "../log.service";
import { Observable } from "rxjs";

@Injectable()
export class EventService {

  url: string = 'https://globalcaal.azurewebsites.net'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private logger: LogService) { }

  postEvent(title: string, description: string, category: string,
            startDate: Date, endDate: Date, startTime: string, endTime: string) {
    return this.http.request('POST', this.url, {
      body: {
        "eventId": 20, // placeholder
        "title": title,
        "category": category,
        "description": description,
        "startDate": this.convertDateObjToString(startDate),
        "endDate": this.convertDateObjToString(endDate),
        "startTime": startTime,
        "endTime": endTime
      }
    }).subscribe();
  }

  updateEvent(eventId: number, title: string, description: string, category: string,
              startDate: Date, endDate: Date, startTime: string, endTime: string) {
    return this.http.request('PUT', this.url, {
      body: {
        "eventId":  {
          "eventId": eventId
        },
        "document": {
          "title": title,
          "category": category,
          "description": description,
          "startDate": this.convertDateObjToString(startDate),
          "endDate": this.convertDateObjToString(endDate),
          "startTime": startTime,
          "endTime": endTime
        }
      }
    }).subscribe();
  }

  deleteEvent(eventId: number) {
    return this.http.request('DELETE', '/app/event', {body: {"eventId": eventId}}).subscribe();
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url + '/app/event');
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(this.url + '/app/event' + '/' + eventId + '');
  }

  // Merge redundancy
  getEventByIdObs(index: number): Observable<Event> {
    return this.http.get<Event>(this.url + '/app/event' + '/' + index);
  }

  // Convert date to ISO string for readability
  public static dateObjToString(date: Date): string {
    return date.toISOString();
  }

  convertDateObjToString(theDate: Date): string {
    return EventService.dateObjToString(theDate);
  }
}
