import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event} from "../interface/event";
import {map} from "rxjs/operators";
import {LogService} from "../log.service";
import {Observable, of} from "rxjs";

@Injectable()
export class EventService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private logger: LogService
  ) { }


  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>('http://localhost:8080/app/event/');
  }

  getEventById(index: string) {
    return this.http.get('http://localhost:8080/app/event/' + index + '').pipe(map((response: any) => response.json()));
  }
}
