import { HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivityFilter, ActivityDataService } from 'src/app/services/activity-data.service';
import { Options } from '@angular-slider/ngx-slider';




@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})

export class FilterModalComponent {
  public categories: [];
  public activityFilter: ActivityFilter;


  options: Options = {
    floor: 2, ceil: 20
  };
  options2: Options = {
    floor: 3, ceil: 60
  };

  constructor(public dataService: ActivityDataService) {
    this.activityFilter = this.dataService.createEmptyFilter();
  };

  // Resets current filter setting

  resetFilter() {
    this.dataService.clearFilter(this.activityFilter);
    console.log("test");
  }

  // function to save filter settings and passing to view-log page
  save() {
  }
}





