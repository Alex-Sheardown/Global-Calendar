import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarService } from "./service/calendar.service";
import { LogService } from "./log.service";
import { UserComponent } from './user/user.component';
import { UserService } from "./service/user.service";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CalendarService, LogService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
