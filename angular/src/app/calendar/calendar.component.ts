import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../service/calendar.service'
import {LogService} from "../log.service";
import {Calendar} from "../interface/calendar";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  public dataSource: any;
  public displayedColumns: string[] = ['calendarId', 'description', 'name', 'userId'];

  constructor(
    private calService: CalendarService,
    private logger: LogService
  ) {
    //change to friends calendars later
    calService.getCalendars().subscribe((response: Calendar[])=> {
      this.dataSource = new MatTableDataSource<Calendar>(response);
    })
  };

  ngOnInit(): void {

  }

}
