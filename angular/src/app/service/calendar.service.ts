import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Calendar} from "../interface/calendar";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class CalendarService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LogService
  ) { }

  getCalendars(): Observable<Calendar[]> {
    return this.http.get<Calendar[]>('http://localhost:8080/app/calendar/');
  }

  getCalendarById(index: number): Observable<Calendar> {
    return this.http.get<Calendar>('http://localhost:8080/app/calendar/' + index + '');
  }
}
