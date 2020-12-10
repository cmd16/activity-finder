import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './credentials';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from "src/environments/environment";
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    ActivityCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
