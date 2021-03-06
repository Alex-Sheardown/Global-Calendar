import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent} from "./event/event.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { DayViewComponent } from "./day-view/day-view.component";
import { WeekViewComponent } from "./week-view/week-view.component";
import { MonthViewComponent } from "./month-view/month-view.component";
import { YearViewComponent} from "./year-view/year-view.component";
import {SettingsComponent} from "./settings/settings.component";

const routes: Routes = [
  //{ path: '', component: WelcomeComponent },
  { path: 'calendar', component: CalendarComponent},// temp
  { path: 'event', component: EventComponent }, // temp
  { path: 'day', component: DayViewComponent },
  { path: 'week', component: WeekViewComponent },
  { path: 'month', component: MonthViewComponent },
  { path: 'year', component: YearViewComponent },
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
