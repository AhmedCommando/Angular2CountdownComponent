import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  stylesObj = {
    'font-size': '1.5em',
    'color': 'blue'
  };
  CountdownFinished(event) {
    alert('Done!');
  }
}
