import { Component, OnInit } from '@angular/core';

export interface Recurrence {
  name: string;
  category: string;
  schedule: string;
  time: string;
}

const RECURRENCES: Recurrence[] = [
  {name: 'Software as a Service', category: 'Class', schedule: 'MW', time: '18:00-20:00'},
  {name: 'Networking', category: 'Class', schedule: 'MW', time: '14:00-16:00'},
  {name: 'Personal Training', category: 'Personal', schedule: 'TTh', time: '08:00-10:00'},
  {name: 'Choir Practice', category: 'Personal', schedule: 'Sat', time: '12:30-13:30'},
];

@Component({
  selector: 'app-recurring-list',
  templateUrl: './recurring-list.component.html',
  styleUrls: ['./recurring-list.component.css']
})
export class RecurringListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'schedule', 'time'];
  dataSource = RECURRENCES;

  constructor() { }

  ngOnInit(): void {
  }

}
