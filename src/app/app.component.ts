import { Component } from '@angular/core';
import { ActivityDataService } from './services/activity-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'activity-finder';

  constructor(public dataService: ActivityDataService) {

  }

  updateFromHardcode() {
    this.dataService.updateFromHardcode();
  }
}
