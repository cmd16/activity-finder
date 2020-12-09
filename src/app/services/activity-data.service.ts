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
  type: string; //type indicates wether or not empty filter
  name: string;
  description: string;
  minParticipants: number;
  maxParticipants: number;
  minTime: number;
  maxTime: number;
  sync: boolean;
  competitive: boolean;
  platform: string[];
  category: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ActivityDataService {

  private activities: Activity[] = [];
  private activityCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.activityCollection = this.db.collection<Activity>("activities");
    this.activityCollection.valueChanges().subscribe(result => {
      this.activities = [];
      result.forEach((item: Activity) => {
        this.activities.push(item);
      });
    });
  }

  public getActivities() {
    return this.activities;
  }

  public addActivity(activity: Activity) {
    this.activityCollection.add(activity);
  }

  private listItemInCommon(list1: string[], list2: string[]) {
    for (let i = 0; i < list2.length; i++) {
      if (list1.includes(list2[i])) {
        return true;
      }
    }
  }

  public getActivitiesWithFilter(filt: ActivityFilter) {
    return this.activities.filter((item) => {
      return (!filt.name || item.name.includes(filt.name)) &&
        (!filt.description || item.description.includes(filt.description)) &&
        (!filt.minParticipants || item.minParticipants <= filt.minParticipants) &&
        (!filt.maxParticipants || item.maxParticipants >= filt.maxParticipants) &&
        (!filt.minTime || item.minTime <= filt.minTime) &&
        (!filt.maxTime || item.maxTime >= filt.maxTime) &&
        (filt.sync == null || item.sync === filt.sync) &&
        (filt.competitive == null || item.competitive === filt.competitive) &&
        (!filt.platform || this.listItemInCommon(filt.platform, item.platform)) &&
        (!filt.category || this.listItemInCommon(filt.category, item.category));
    })
  }
}
