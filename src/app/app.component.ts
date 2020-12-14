import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivityDataService } from './services/activity-data.service';
import { Activity } from './services/activity-data.service'
import { MatDialog } from '@angular/material/dialog';
import {AddActivityDialogComponent} from './add-activity-dialog/add-activity-dialog.component';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'activity-finder';

  constructor(public dataService: ActivityDataService, public dialog: MatDialog) {

  }

  public showDialog()
  {
    this.dialog.open(AddActivityDialogComponent);
  }
}