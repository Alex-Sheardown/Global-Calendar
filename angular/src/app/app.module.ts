// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

// Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule} from "@angular/material/table";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule} from "@angular/material/select";
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";

//Components and Services
import { AppComponent } from './app.component';
import { LogService } from "./log.service";
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from "./service/calendar.service";
import { UserComponent } from './user/user.component';
import { UserService } from "./service/user.service";
import { EventComponent } from './event/event.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventService } from "./service/event.service";
import { DayViewComponent } from './day-view/day-view.component';
import { WeekViewComponent } from './week-view/week-view.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { SettingsComponent } from './settings/settings.component';
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";
import { FormsModule} from "@angular/forms";
import { MatSelectModule} from "@angular/material/select";
import { UserComponent } from './user/user.component';
import { UserService } from "./service/user.service";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { RecurringListComponent } from './recurring-list/recurring-list.component';
import { AnalogClockComponent } from './analog-clock/analog-clock.component';
import { LoginService } from './service/login.service'
import { SigninComponent } from "./signin/signin.component";

// Fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timeGrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    EventComponent,
    DayViewComponent,
    WeekViewComponent,
    MonthViewComponent,
    YearViewComponent,
    SettingsComponent,
    EventListComponent,
    UserComponent,
    RecurringListComponent,
    AnalogClockComponent,
    SigninComponent
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
    MatOptionModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    NoopAnimationsModule
  ],
  providers: [CalendarService, LogService, EventService, UserService, LoginService],
  bootstrap: [AppComponent]
})

export class AppModule { }
