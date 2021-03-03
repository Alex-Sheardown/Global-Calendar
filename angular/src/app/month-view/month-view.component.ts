import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
  }
}
