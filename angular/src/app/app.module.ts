import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from "./service/calendar.service";
import { LogService } from "./log.service";


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CalendarService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
