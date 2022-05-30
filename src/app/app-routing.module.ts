import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsComponent} from "./clients/clients.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: 'clients', component:ClientsComponent },
  { path: 'reservations', component:ReservationsComponent },
  { path: 'home', component:HomeComponent },
  { path: '', component:HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
