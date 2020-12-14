import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './credentials';
import { FilterModalComponent } from './components/filter-modal/filter-modal.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { environment } from "src/environments/environment";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { AddActivityDialogComponent } from './add-activity-dialog/add-activity-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterModalComponent,
    ActivityCardComponent,
    AddActivityDialogComponent
  ],
  entryComponents: [AddActivityDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    NgxSliderModule,
    MatAutocompleteModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
