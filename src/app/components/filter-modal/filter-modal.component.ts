import { HostListener, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivityFilter } from 'src/app/services/activity-data.service';


@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent {

  @Input() Filter: ActivityFilter;
  type: string;

  constructor(public dataService: ActivityFilter, private alertCtrl: AlertController) {
  }


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
  };
