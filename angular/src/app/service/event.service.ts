import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from "../interface/event";
import { LogService } from "../log.service";
import { Observable } from "rxjs";

@Injectable()
export class EventService { //TODO: TO AZURE

  //url: string = 'http://localhost:8080/app/event' //to test locally.
  hostURL: string =  '/';
  pathURL: string = 'app/event';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private logger: LogService) { }

  postEvent(title: string, description: string, category: string, startDate: Date, endDate: Date, startTime: string, endTime: string) {
    return this.http.request('POST', this.hostURL + this.pathURL, {
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

  deleteEvent(eventId: number) {
    return this.http.request('DELETE', this.hostURL + this.pathURL, {body: {"eventId": eventId}}).subscribe();
  }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.hostURL + this.pathURL);
  }

  getEventById(eventId: number): Observable<Event> {
    return this.http.get<Event>(this.hostURL + this.pathURL + '/' + eventId + '');
  }

  // Merge redundancy
  getEventByIdObs(index: number): Observable<Event> {
    return this.http.get<Event>(this.hostURL + this.pathURL + '/' + index);
  }

  // Convert date to ISO string for readability
  public static dateObjToString(date: Date): string {
    return date.toISOString();
  }

  convertDateObjToString(theDate: Date): string {
    return EventService.dateObjToString(theDate);
  }
}

//Original
// export class EventService { //TODO: LOCALLY 

//   url: string = 'http://localhost:8080/app/event'
  

//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };

//   constructor(private http: HttpClient, private logger: LogService) { }

//   postEvent(title: string, description: string, category: string, startDate: Date, endDate: Date, startTime: string, endTime: string) {
//     return this.http.request('POST', this.url, {
//       body: {
//         "eventId": 20, // placeholder
//         "title": title,
//         "category": category,
//         "description": description,
//         "startDate": this.convertDateObjToString(startDate),
//         "endDate": this.convertDateObjToString(endDate),
//         "startTime": startTime,
//         "endTime": endTime
//       }
//     }).subscribe();
//   }

//   deleteEvent(eventId: number) {
//     return this.http.request('DELETE', this.url, {body: {"eventId": eventId}}).subscribe();
//   }

//   getEvents(): Observable<Event[]> {
//     return this.http.get<Event[]>(this.url);
//   }

//   getEventById(eventId: number): Observable<Event> {
//     return this.http.get<Event>(this.url + '/' + eventId + '');
//   }

//   // Merge redundancy
//   getEventByIdObs(index: number): Observable<Event> {
//     return this.http.get<Event>(this.url + '/' + index);
//   }

//   // Convert date to ISO string for readability
//   public static dateObjToString(date: Date): string {
//     return date.toISOString();
//   }

//   convertDateObjToString(theDate: Date): string {
//     return EventService.dateObjToString(theDate);
//   }
// }
