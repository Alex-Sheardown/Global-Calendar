import {Component, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { EventService } from "../service/event.service";
import { Observable } from "rxjs";
import { LogService } from "../log.service";
import { Event } from "../interface/event";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, OnChanges{

  displayedColumns: string[] = [
    'eventId', 'title', 'category', 'description',
    'startDate', 'startTime', 'endDate', 'endTime', 'action'
  ];
  dataSource = new MatTableDataSource<Event>();

  constructor(private eventService: EventService, private router: Router, private logger: LogService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents().subscribe((result: Event[]) => {
      this.dataSource = new MatTableDataSource<Event>(result);
    })
  }

  deleteEvent(eventId: number) {
    this.eventService.deleteEvent(eventId);
  }

  goToManageEvents() {this.router.navigate(['schedule/manage']);}
}
