import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface Activity {
  name: string;
  description: string;
  variations?: string;
  minParticipants?: number;
  maxParticipants?: number;
  minTime?: number;  // minutes
  maxTime?: number;  // minutes
  links?: string[];
  sync: boolean;  // whether activity is synchronous or asynchronous
  competitive: boolean;
  platform: string[];  // e.g., video call, audio call, chat, online
  category: string[];  // e.g., video game, board game, art, writing, video call, challenge
}

export interface ActivityFilter {
  name: string;  // exact match
  minParticipants: number;
  maxParticipants: number;
  minTime: number;
  maxTime: number;
  sync: boolean;
  competitive: boolean;
  platform: string[];  // activity must have at least one of these
  category: string[];  // activity must have at least one of these
  nameQuery: string;  // includes
  descriptionQuery: string;  // includes
  nameOrDescriptionQuery: string;  // includes
}

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {

  public activities: Activity[] = [];
  public filteredActivities: Activity[] = [];
  private activityCollection: AngularFirestoreCollection;
  public categories: string[] = [];
  public platforms: string[] = [];
  public minParticipants: number;
  public maxParticipants: number;
  public minTime: number;
  public maxTime: number;

  // get records from database, get info about the collection overall (e.g., list of all categories)
  constructor(private db: AngularFirestore) {
    this.activityCollection = this.db.collection<Activity>("activities");
    this.activityCollection.valueChanges().subscribe(result => {
      this.activities = [];
      this.categories = [];
      this.platforms = [];
      this.minParticipants = Infinity;
      this.maxParticipants = -Infinity;
      this.minTime = Infinity;
      this.maxTime = -Infinity;
      result.forEach((item: Activity) => {
        this.activities.push(item);
        if (item.minParticipants && (item.minParticipants < this.minParticipants)) {
          this.minParticipants = item.minParticipants;
        }
        if (item.maxParticipants && (item.maxParticipants > this.maxParticipants)) {
          this.maxParticipants = item.maxParticipants;
        }
        if (item.minTime && (item.minTime < this.minTime)) {
          this.minTime = item.minTime;
        }
        if (item.maxTime && (item.maxTime > this.maxTime)) {
          this.maxTime = item.maxTime;
        }
        item.category.forEach((cat: string) => {
          if (!this.categories.includes(cat)) {
            this.categories.push(cat)
          }
        });
        item.platform.forEach((pla: string) => {
          if (!this.platforms.includes(pla)) {
            this.platforms.push(pla)
          }
        });
      });
      this.filteredActivities = this.activities;
    });

  }

  public addActivity(activity: Activity) {
    this.activityCollection.add(activity);
  }

  // find if at least one item from list2 is also in list 1
  private listItemInCommon(list1: string[], list2: string[]) {
    for (let i = 0; i < list2.length; i++) {
      if (list1.includes(list2[i])) {
        return true;
      }
    }
    return false
  }

  // filter activities given a filter object. Filter only on the fields that are defined
  public filterActivities(filt: ActivityFilter) {
    this.filteredActivities = this.activities.filter((item) => {
      return (!filt.name || (item.name.toLowerCase() === filt.name.toLowerCase())) &&
        (!item.minParticipants || item.minParticipants >= filt.minParticipants) &&
        (!item.maxParticipants || item.maxParticipants <= filt.maxParticipants) &&
        (!item.minTime || item.minTime >= filt.minTime) &&
        (!item.maxTime || item.maxTime <= filt.maxTime) &&
        (filt.sync == null || item.sync === filt.sync) &&
        (filt.competitive == null || item.competitive === filt.competitive) &&
        (!filt.platform || this.listItemInCommon(filt.platform, item.platform)) &&
        (!filt.category || this.listItemInCommon(filt.category, item.category)) &&
        (!filt.nameQuery || item.name.toLowerCase().includes(filt.nameQuery.toLowerCase())) &&
        (!filt.descriptionQuery || item.description.toLowerCase().includes(filt.descriptionQuery.toLowerCase())) &&
        (!filt.nameOrDescriptionQuery || item.name.toLowerCase().includes(filt.nameOrDescriptionQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(filt.nameOrDescriptionQuery.toLowerCase()));
    })
  }

  // create an empty filter
  public createEmptyFilter(): ActivityFilter {
    return {
      name: null,
      minParticipants: 2,
      maxParticipants: 20,
      minTime: 5,
      maxTime: 60,
      sync: null,
      competitive: null,
      platform: null,
      category: null,
      nameQuery: null,
      descriptionQuery: null,
      nameOrDescriptionQuery: null,
    }
  }

  // clear the fields of an existing filter
  public clearFilter(input: ActivityFilter) {
    // hardcode values for min/max participants and min/max time so that we can bind to the UI without problems
    input.minParticipants = 2;
    input.maxParticipants = 20;
    input.minTime = 5;
    input.maxTime = 60;
    input.sync = undefined;
    input.competitive = undefined;
    input.platform = undefined;
    input.category = undefined;
    input.nameQuery = undefined;
    input.descriptionQuery = undefined;
    input.nameOrDescriptionQuery = undefined;
    
    this.filteredActivities = this.activities;
  }

  // clear everything except search; for use when searching
  public clearAllButSearch(input: ActivityFilter) {
    input.minParticipants = 2;
    input.maxParticipants = 20;
    input.minTime = 5;
    input.maxTime = 60;
    input.sync = undefined;
    input.competitive = undefined;
    input.platform = undefined;
    input.category = undefined;
  }
}
