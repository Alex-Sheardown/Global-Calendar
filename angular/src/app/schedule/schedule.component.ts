import {Component, OnInit, ViewChild} from '@angular/core';
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
export class ScheduleComponent implements OnInit {

  displayedColumns: string[] = [
    'eventId', 'title', 'category', 'description',
    'startDate', 'endDate', 'startTime', 'endTime'
  ];
  dataSource = new MatTableDataSource<Event>();

  /*@ViewChild(MatSort, {static: true}) sort: MatSort | any;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | any;*/

  constructor(private eventService: EventService, private router: Router, private logger: LogService) { }

  ngOnInit(): void {
    this.eventService.getEvents().subscribe((result: Event[]) => {
      this.dataSource = new MatTableDataSource<Event>(result);
      /*this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;*/
    })
  }

  goToManageEvents() {this.router.navigate(['schedule/manage']);}

}
