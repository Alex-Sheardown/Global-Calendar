import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from "./service/calendar.service";
import { LogService } from "./log.service";
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule
  ],
  providers: [CalendarService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
