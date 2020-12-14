import { HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivityFilter } from 'src/app/services/activity-data.service';
import { Options } from '@angular-slider/ngx-slider';




@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})

export class FilterModalComponent {
  @Input() Filter: ActivityFilter;
  type: string;
  // private name: string;
  // private description: string;
  // private competitive: boolean = false;
  // private synch: boolean = false;  // whether activity is synchronous or asynchronous.
  // private minParticipants?: number;
  // private maxParticipants?: number;
  // private minTime?: number = 0;  // minutes
  // private maxTime?: number = 120; // minutes
  // private link?: string;
  // public catagories: [];

  @Input() name: string;
  @Input() description: string;
  @Input() competitive: boolean = false;
  @Input() synch: boolean = false;  // whether activity is synchronous or asynchronous.
  @Input() minParticipants?= 4;
  @Input() maxParticipants?= 8;
  @Input() minTime?: number = 10;  // minutes
  @Input() maxTime?: number = 25; // minutes
  @Input() link?: string;
  public categories: [];


  options: Options = {
    floor: 2, ceil: 20
  };
  options2: Options = {
    floor: 3, ceil: 60
  };

  constructor() {

  };

  // Resets current filter setting

  resetFilter() {
    this.type = 'nofilter';
  }

  // function to save filter settings and passing to view-log page
  save() {
    if (this.type == 'nofilter') {
      this.Filter.type = undefined;
    } else {
      this.Filter.type = this.type;
    }
  }
}





