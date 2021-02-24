import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent} from "./event/event.component";
import { CalendarComponent } from "./calendar/calendar.component";

const routes: Routes = [
  //{ path: '', component: WelcomeComponent },
  { path: 'calendar', component: CalendarComponent},
  { path: 'event', component: EventComponent },
  //{ path: 'day', component: DayComponent },
  //{ path: 'week', component: WeekComponent },
  //{ path: 'month', component: MonthComponent },
  //{ path: 'year', component: YearComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
