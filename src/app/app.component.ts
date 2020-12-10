import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivityDataService } from './services/activity-data.service';
import { Activity } from './services/activity-data.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'activity-finder';

  constructor(public dataService: ActivityDataService) {

  }

  public showDialog()
  {
    console.log("foo");
  }
}
