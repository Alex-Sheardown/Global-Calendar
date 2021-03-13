import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Calendar} from "../interface/calendar";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class CalendarService { //TODO: EMMA

  //public url: string = 'http://localhost:8080/app/calendar/';
  hostURL: string =  '/';
  pathURL: string = 'app/calendar';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LogService
  ) { }

  getCalendars(): Observable<Calendar[]>{
    return this.http.get<Calendar[]>(this.hostURL + this.pathURL);
  }

  getCalendarById(calendarId: number): Observable<Calendar> {
    return this.http.get<Calendar>(this.hostURL + this.pathURL + calendarId + '');
  }
}
// export class CalendarService { //TODO: LOCALLY
//
//   public url: string = 'http://localhost:8080/app/calendar/';
//
//   httpOptions = {
//     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
//   };
//
//   constructor(
//     private http: HttpClient,
//     private logger: LogService
//   ) { }
//
//   getCalendars(): Observable<Calendar[]>{
//     return this.http.get<Calendar[]>(this.url);
//   }
//
//   getCalendarById(calendarId: number): Observable<Calendar> {
//     return this.http.get<Calendar>(this.url + calendarId + '');
//   }
// }
