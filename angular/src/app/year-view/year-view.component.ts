import { Component, OnInit } from '@angular/core';
import { FullCalendarComponent, CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-year-view',
  templateUrl: './year-view.component.html',
  styleUrls: ['./year-view.component.css']
})
export class YearViewComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {}

  calendarOptions: CalendarOptions = {
    initialView: 'matMonthView',
    droppable: true,
    events: [
      { title: "Hank's Vet Appointment", start: '2021-03-09T12:00', end: "2021-03-09T12:00"},
      { title: "Presentation Preparation", start: '2021-03-09T16:00', end: "2021-03-09T18:00"},
      { title: "Capstone Zoom Meeting", start: '2021-03-09T11:00', end: "2021-03-09T13:00"},
      { title: "SaaS Zoom Meeting", start: '2021-03-09T18:00', end: "2021-03-09T20:00"},
      { title: "Group Project Meeting", start: '2021-03-09T14:00', end: "2021-03-09T17:00"},
    ]
  }
}
