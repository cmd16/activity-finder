import { Component, OnInit } from '@angular/core';
import { ActivityDataService } from '../services/activity-data.service';
import { Activity } from '../services/activity-data.service';

@Component({
  selector: 'app-add-activity-dialog',
  templateUrl: './add-activity-dialog.component.html',
  styleUrls: ['./add-activity-dialog.component.scss']
})
export class AddActivityDialogComponent implements OnInit {
  // required for Activity object
  public name: string;
  public desc: string;
  public sync: boolean;
  public comp: boolean;
  public plat: string;
  public cat: string;

  // optional for Activity object
  public vari: string;
  public minPar: number;
  public maxPar: number;
  public minT: number;
  public maxT: number;
  public links: string;

  // class variables
  public message: string;

  constructor(public dataService: ActivityDataService) { }

  /**
   * This method is run when the 'add activity!' button 
   * of the add-activity-dialog component is clicked.
   */
  public save()
  {
    /**
     * If any required fields are not filled in, show an error message and 
     * allow user to update required fields.
     * 
     * Else if any of the numeric fields aren't of type Number, then show an error
     * message and allow user to update the fields.
     * 
     * Else create a new activity object and call dataService.addActivity()
     */
    if ( (this.name === undefined) || 
          (this.desc === undefined) ||
          (this.plat === undefined) ||
          (this.cat === undefined)) 
    {
      this.message = "Activity not added: make sure all required fields are filled in.";
    }
    // else if(isNaN(this.minPar) || 
    //         isNaN(this.maxPar) || 
    //         isNaN(this.minT) || 
    //         isNaN(this.maxT))
    // {
    //   this.message = "Activity not added: make sure min participants, max participants, min time, max time are numbers (ex: 1, 23, etc.)."
    // }
    else
    {
      if( this.sync === undefined ) { this.sync = false; }
      if( this.comp === undefined ) { this.comp = false; }

      // a is the working Activity object:
      let a: Activity = 
      {
        name: this.name,
        description: this.desc,
        sync: this.sync,
        competitive: this.comp,
        platform: (this.plat.split(",")),
        category: (this.cat.split(","))
      };

      // Handle optional cases: if they are not undefined then include them...
      if(!(this.vari === undefined)) { a.variations = this.vari; }
      if(!(this.minPar === undefined)) { a.minParticipants = this.minPar; }
      if(!(this.maxPar === undefined)) { a.maxParticipants = this.maxPar; }
      if(!(this.minT === undefined)) { a.minTime = this.minT; }
      if(!(this.maxT === undefined)) { a.maxTime = this.maxT; }
      if(!(this.links === undefined)) { a.links = (this.links.split(",")); }

      this.dataService.addActivity(a);

      // this.name = undefined;
      // this.desc = undefined;
      // this.sync = undefined;
      // this.comp = undefined;
      // this.plat = undefined;
      // this.cat = undefined;
      // this.vari = undefined;
      // this.minPar =undefined;
      // this.maxPar = undefined;
      // this.minT = undefined;
      // this.maxT = undefined;
      // this.links = undefined;
    }
  }

  ngOnInit(): void {
  }

}
