import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit {

  countdown = '';
  timer: any;
  format = '';

  @Input()
  units: any;

  @Input()
  endDate: any;

  @Input()
  style: any;

  @Output()
  onfinish = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if (typeof this.units === 'string') {
      this.units = this.units.split(':');
    }
    this.units.forEach(unit => {
      if (unit === 'd') {
        this.format += ' dd Days ';
      }
      if (unit === 'h') {
        this.format += ' hh Hours ';
      }
      if (unit === 'm') {
        this.format += ' mm Minutes ';
      }
      if (unit === 's') {
        this.format += ' ss Seconds ';
      }
    });
    this.timer = setInterval(() => {
      this.countdown = this.countDownCalculator();
    }, 1000);
  }

/**
 * Calculate the distance between the current time and the whished time
 */
  countDownCalculator() {
    const now = new Date().getTime();
    const distance = new Date(this.endDate).getTime() - now;
    if (distance < 0) {
      clearInterval(this.timer);
      this.onfinish.emit();
      return this.format.replace('dd', '0')
                        .replace('hh', '0')
                        .replace('mm', '0')
                        .replace('ss', '0');
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return this.format.replace('dd', days.toString())
                      .replace('hh', hours.toString())
                      .replace('mm', minutes.toString())
                      .replace('ss', seconds.toString());
  }



}
