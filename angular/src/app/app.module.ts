import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from "./service/calendar.service";
import { LogService } from "./log.service";
import { EventComponent } from './event/event.component';
import { EventService } from "./service/event.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule} from "@angular/material/table";
import { MonthViewComponent } from './month-view/month-view.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import { WeekViewComponent } from './week-view/week-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { DayViewComponent } from './day-view/day-view.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventComponent,
    MonthViewComponent,
    WeekViewComponent,
    YearViewComponent,
    DayViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    FullCalendarModule,
  ],
  providers: [CalendarService, LogService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
