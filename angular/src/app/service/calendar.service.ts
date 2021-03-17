import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Calendar} from "../interface/calendar";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class CalendarService {

  // public url: string = 'https://globalcal5.azurewebsites.net/';
  // public url2: string = 'https://globalcal5.azurewebsites.net/app/user/calendar/';

  hostURL:string = '/'
  pathURL:string = 'app/calendar/'
  path2URL:string = 'app/user/calendar/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LogService,

  ) { }

  getCalendars(): Observable<Calendar[]>{
    return this.http.get<Calendar[]>(this.hostURL+ this.pathURL);
  }

  getCalendarById(calendarId: number): Observable<Calendar> {
    return this.http.get<Calendar>(this.hostURL+this.pathURL + calendarId + '');
  }

  getCalendarByUserId(userId: number): Observable<Calendar> {
    return this.http.get<Calendar>(this.hostURL+this.path2URL + userId + '');
  }

}
