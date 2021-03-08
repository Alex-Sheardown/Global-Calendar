import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {EventListComponent} from "../event-list/event-list.component";
import {CalendarService} from "../service/calendar.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges) {
    this.pullCalendarData(this.calendarNumber);
  }

  public selectedDate = new Date();
  public calendarNumber = 1;
  public calendarName: string = '';

  constructor(
    private calendarService: CalendarService
  ) {
    this.pullCalendarData(this.calendarNumber);
  }

  ngOnInit(): void {
    this.selectedDate.setHours(0);
  }

  pullCalendarData(calendarId: number): void{
    this.calendarService.getCalendarById(calendarId).subscribe( response => {
      this.calendarName = response.name;
    });
}

}
