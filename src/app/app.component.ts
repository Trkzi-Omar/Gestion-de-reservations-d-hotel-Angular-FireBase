import {Component, OnInit} from '@angular/core';
import {AngularFireAction} from "@angular/fire/compat/database";
import {CrudService} from './service/crud.service';
import {collection} from "@angular/fire/firestore";
import {ClientsComponent} from "./clients/clients.component";
import {ReservationsComponent} from "./reservations/reservations.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Agence Voyage';
  successMessage: string = "";

  constructor(public crudService: CrudService,public clientsComponent:ClientsComponent) {
  }

  ngOnInit() {

  }
}
