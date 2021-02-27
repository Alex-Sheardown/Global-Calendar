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

FullCalendarModule.registerPlugins([
  dayGridPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventComponent,
    MonthViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    FullCalendarModule
  ],
  providers: [CalendarService, LogService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
