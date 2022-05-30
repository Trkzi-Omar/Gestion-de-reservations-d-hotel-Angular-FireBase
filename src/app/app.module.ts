import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {ContactsComponent} from './contacts/contacts.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {environment} from '../environments/environment';
import {CrudService} from './service/crud.service';

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClientsComponent} from './clients/clients.component';
import {ReservationsComponent} from './reservations/reservations.component';
import { RoomTypesComponent } from './room-types/room-types.component';
import { HomeComponent } from './home/home.component';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactsComponent,
    ClientsComponent,
    ReservationsComponent,
    RoomTypesComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    NgbModule,
  ],
  providers: [
    CrudService,
    ClientsComponent,
    RoomTypesComponent,
    ReservationsComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
