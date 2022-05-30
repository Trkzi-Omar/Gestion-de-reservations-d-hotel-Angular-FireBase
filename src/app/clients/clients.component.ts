import {Component, OnInit} from '@angular/core';
import {AngularFireAction} from "@angular/fire/compat/database";
import {CrudService} from '../service/crud.service';
import {collection} from "@angular/fire/firestore";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public client: any;
  nameClient: string | null = null;
  addressClient: string | null = null;
  successMessage: string = "";

  constructor(public crudService: CrudService) {
  }

  ngOnInit(): void {
    this.crudService.get_allClient().subscribe(
      data => this.client = data.map(e => {
        return {
          id: e.payload.doc.id,
          isBeingEdited: false,//Unmapped field
          // @ts-ignore
          name: e.payload.doc.data()['name'],
          // @ts-ignore
          address: (e.payload.doc.data()['address']).toString(),
        };
      }));

  }

  createClient() {
    let Client: { [index: string]: any } = {};
    if (this.nameClient != null && this.addressClient != null) {
      Client['name'] = this.nameClient;
      Client['address'] = this.addressClient;

      this.crudService.create_newClient(Client).then(res => {
        this.nameClient = "";
        this.addressClient = "";
        console.log(res)
        this.successMessage = "Ajout avec succés ✅";
      }).catch(error => (console.log(error)));
    }
  }

  editClient(clt:any) {
    clt.isBeingEdited = true
    clt.toEditName = clt.name.toString();
    clt.toEditAddress = clt.address.toString();
    console.log(clt)
    throw new Error("There is no error :)");
  }

  updateClient(clt: any) {
    let updatedClt: { [index: string]: any } = {};
    updatedClt['name'] = clt.toEditName;
    updatedClt['address'] = clt.toEditAddress;
    this.crudService.update_client(clt.id, updatedClt);
    clt.isBeingEdited = false;
  }

  deleteClient(id: any) {
    this.crudService.delete_client(id);    throw new Error("There is no error :)");

  }

}
