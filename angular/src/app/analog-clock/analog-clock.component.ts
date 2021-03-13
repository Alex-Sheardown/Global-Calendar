import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.css']
})
export class AnalogClockComponent implements AfterViewInit {

  hourHandStyle: any;
  minuteHandStyle: any;
  secondHandStyle: any;

  isRunning = true;
  timerId: any;

  date: Date = new Date();
  hour: number = 0;
  minute: number = 0;
  second: number = 0;

  ngAfterViewInit() {
    this.timerId = this.getTime();
  }

  animateAnalogClock() {
    this.hourHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.hour * 30) + (this.minute * 0.5) + (this.second * (0.5 / 60))}deg)` };
    this.minuteHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.minute * 6) + (this.second * 0.1)}deg)` };
    this.secondHandStyle = { transform: `translate3d(-50%, 0, 0) rotate(${this.second * 6}deg)` };
  }

  getTime() {
    return setInterval(() => {
      this.date = new Date();
      this.hour = this.date.getHours();
      this.minute = this.date.getMinutes();
      this.second = this.date.getSeconds();

      this.animateAnalogClock();
    }, 1000);
  }

  format(num: number) {
    return (num + '').length === 1 ? '0' + num : num + '';
  }

  toggle() {
    if (this.isRunning) {
      clearInterval(this.timerId);
    } else { this.getTime(); }

    this.isRunning = !this.isRunning;
  }
}
