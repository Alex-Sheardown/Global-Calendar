import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../service/event.service";
import {LogService} from "../log.service";
import {Event} from "../interface/event";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  @Input() datePicker: any;
  public eventList: Event[] | undefined;

  // For MatTable
  displayedColumns: string[] = ['category', 'title', 'description', 'startTime', 'endTime'];
  dataSource: any;

  constructor(
    private eventService: EventService,
    private logger: LogService
  ) {
    eventService.getEvents().subscribe((response: Event[])=> {
      this.dataSource = new MatTableDataSource<Event>(response);
    })
  }

  ngOnInit(): void {
  }

}
