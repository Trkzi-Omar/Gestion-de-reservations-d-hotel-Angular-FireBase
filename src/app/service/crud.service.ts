import {Injectable} from '@angular/core';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireDatabaseModule} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(public firesServices: AngularFirestore) {
  }

  create_newClient(clt: any) {
    return this.firesServices.collection('client').add(clt);
  }

  get_allClient() {
    return this.firesServices.collection('client').snapshotChanges();
  }

  update_client(idClt: any, updatedClt: { [p: string]: any }) {
    this.firesServices.doc('client/' + idClt).update(updatedClt);
  }

  delete_client(idClt: any) {
    this.firesServices.doc('client/' + idClt).delete();
  }

  //Hotel Booking:
  create_newBooking(bkng: any) {
    return this.firesServices.collection('booking').add(bkng);
  }

  get_allBooking() {
    return this.firesServices.collection('booking').snapshotChanges();
  }

  update_booking(idBkng: any, updatedBkng: { [p: string]: any }) {
    this.firesServices.doc('booking/' + idBkng).update(updatedBkng);
  }

  delete_booking(idBkng: any) {
    this.firesServices.doc('booking/' + idBkng).delete();
  }

//RoomTypes:
  get_allRoomTypes() {
    return this.firesServices.collection('roomType').snapshotChanges();
  }
}
