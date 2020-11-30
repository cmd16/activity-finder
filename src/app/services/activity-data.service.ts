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

  private activities_hardcoded: Activity[];
  activities: Activity[] = [];
  private activityCollection: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.activities_hardcoded = [{
      name: "One Word Story",
      description: "Take turns each writing one word to form a story.",
      variations: "Longer chunks (sentences, paragraphs, etc.).",
      minParticipants: 2,
      sync: false,
      competitive: false,
      platform: ["chat"],
      category: ["writing"]
    }, {
      name: "Random Word Generator",
      description: "Use a random word generator to find inspiration for writing or art. Everyone acts on the same prompt.",
      minParticipants: 2,
      sync: true,
      competitive: false,
      platform: ["video call"],
      category: ["writing", "art"]
    }, {
      name: "Watch Movies or Listen to Music",
      description: "Many sites and tools allow you to watch or listen to things together.",
      variations: "Add a game onto it (e.g., if watching Legally Blonde, do a push-up every time 'blonde' is said).",
      sync: true,
      competitive: false,
      minParticipants: 2,
      links: ["https://www.watch2gether.com/", "https://chrome.google.com/webstore/detail/netflix-party-is-now-tele/oocalimimngaihdkbihfgmpkcpnmlaoa?hl=en"],
      platform: ["online", "video call", "audio call"],
      category: ["movie", "music"],
    }, {
      name: "Award Show",
      description: "Make an award show in which you choose the categories and vote on the winners. To enhance the atmosphere, music and fancy outfits are recommended.",
      sync: true,
      competitive: true,
      minParticipants: 4,
      platform: ["video call"],
      category: ["video call"],
    }, {
      name: "Mad Libs",
      description: "Play mad libs, the game in which other people fill in blanks without knowing the context and then you read the funny story!",
      variations: "Create your own! One player writes the story, and the other players fill in the blanks.",
      sync: true,
      competitive: false,
      minParticipants: 2,
      links: ["https://www.madlibs.com/"],
      platform: ["video call", "audio call"],
      category: ["game", "writing"]
    }, {
      name: "Mad Lib Theater",
      description: "Like mad libs, but rather than a story, you're filling in a script. \
        One person writes/finds the script, one or more people fill in the blanks, and two or more people act out the script (having never seen it before).",
      sync: true,
      competitive: false,
      minParticipants: 4,
      links: ["https://www.youtube.com/watch?v=kM9Wuzj4k24"],
      platform: ["video call", "audio call"],
      category: ["game", "acting", "writing"]
    }, {
      name: "Create a Gallery Photo",
      description: "Take advantage of the box format of video call to work together to make a cool picture. Follow the link for some inspiration.",
      sync: true,
      competitive: false,
      minParticipants: 2,
      links: ["https://imgur.com/gallery/1xSI8zB"],
      platform: ["video call"],
      category: ["video call", "art"],
    }, {
      name: "PowerPoint Party",
      description: "Each person creates a funny PowerPoint (Google Slides, etc.) presentation. \
        Then, each person is assigned another person's presentation (which they have never seen before) to present.",
      sync: true,
      competitive: false,
      platform: ["video call", "online"],
      category: ["video call"],
    },
    ];

    this.activityCollection = this.db.collection<Activity>("activities");
    this.activityCollection.valueChanges().subscribe(result => {
      this.activities = [];
      result.forEach((item: Activity) => {
        this.activities.push(item);
      });
    });

  }

  public getActivities() {
    return this.activities_hardcoded;
  }

  public updateFromHardcode() {
    console.log("updating database from hardcode");
    for (let i = 0; i < this.activities_hardcoded.length; i++) {
      this.activityCollection.add(this.activities_hardcoded[i]);
    }
  }

  public addActivity(activity: Activity) {
    this.activities_hardcoded.push(activity);
  }

  private listItemInCommon(list1: string[], list2: string[]) {
    for (let i = 0; i < list2.length; i++) {
      if (list1.includes(list2[i])) {
        return true;
      }
    }
  }

  public getActivitiesWithFilter(filt: ActivityFilter) {
    return this.activities_hardcoded.filter((item) => {
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
