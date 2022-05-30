import {Component, OnInit} from '@angular/core';
import {CrudService} from "../service/crud.service";
import {ClientsComponent} from "../clients/clients.component";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  booking: any;
  allClients: any;
  bookingClient: string | null = null;
  roomN: number | null = null;
  start: Date | null = null;
  end: Date | null = null;
  roomType: string | null = null;
  smoking: boolean | null = null;
  pricePerNight: number | null = null;
  nNights: number | null = null;
  roomTypes: any;
  successMessage: string = "";

  constructor(public crudService: CrudService) {
  }

  ngOnInit(): void {
    this.crudService.get_allBooking().subscribe(
      data => this.booking = data.map(e => {
        // @ts-ignore
        let days = Math.floor((new Date(e.payload.doc.data()['end']).getTime() - new Date(e.payload.doc.data()['start']).getTime()) / (1000 * 3600 * 24));
        if (0 == days) {
          days = 1;
        }
        return {
          id: e.payload.doc.id,
          isBeingEdited: false,//Unmapped field
          // @ts-ignore
          bookingClient: e.payload.doc.data()['bookingClient'],
          // @ts-ignore
          roomN: e.payload.doc.data()['roomN'],
          // @ts-ignore
          start: (e.payload.doc.data()['start']),
          // @ts-ignore
          end: (e.payload.doc.data()['end']),
          // @ts-ignore
          nNights: days,
          // @ts-ignore
          roomType: (e.payload.doc.data()['roomType']),
          // @ts-ignore
          smoking: (e.payload.doc.data()['smoking']),
          // @ts-ignore
          pricePerNight: (e.payload.doc.data()['pricePerNight']),
        };
      }));
    this.crudService.get_allClient().subscribe(
      data => this.allClients = data.map(e => {
        return {
          id: e.payload.doc.id,
          isBeingEdited: false,//Unmapped field
          // @ts-ignore
          name: e.payload.doc.data()['name'],
          // @ts-ignore
          address: (e.payload.doc.data()['address']).toString(),
        };
      }));
    this.crudService.get_allRoomTypes().subscribe(
      data => this.roomTypes = data.map(e => {
        console.log(this.roomTypes);
        return {
          id: e.payload.doc.id,
          // @ts-ignore
          type: e.payload.doc.data()['type'],
        };
      }));
    ;
  }


//Booking
  createBooking() {
    let Booking: { [index: string]: any } = {};
    if (this.roomN != null && this.bookingClient != null && this.start != null) {
      Booking['bookingClient'] = this.bookingClient;
      Booking['start'] = this.start;
      Booking['end'] = this.end;
      Booking['roomN'] = this.roomN;
      Booking['roomType'] = this.roomType;
      Booking['smoking'] = this.smoking;
      Booking['pricePerNight'] = this.pricePerNight;
      console.log(Booking);
      console.log("this.roomType <--> " + this.roomType);
      this.crudService.create_newBooking(Booking).then(res => {
        this.bookingClient = null;
        this.roomN = null;
        this.start = null;
        this.end = null;
        this.roomType = null;
        this.smoking = null;
        this.pricePerNight = null;
        //console.log(res)
        this.successMessage = "Ajout avec succés ✅";
      }).catch(error => (console.log(error)));
    }
  }

  editBooking(bkng: any) {
    bkng.isBeingEdited = true
    bkng.toEditBookingClient = bkng.bookingClient;
    bkng.toEditRoomN = bkng.roomN;
    bkng.toEditStart = bkng.start;
    bkng.toEditEnd = bkng.end;
    bkng.toEditRoomType = bkng.roomType;
    bkng.toEditSmoking = bkng.smoking;
    bkng.toEditPricePerNight = bkng.pricePerNight;

    console.log(bkng);
    throw new Error("There is no error :)");

  }

  updateBooking(bkng: any) {
    let updatedBkng: { [index: string]: any } = {};

    updatedBkng['bookingClient'] = bkng.toEditBookingClient;
    updatedBkng['roomN'] = bkng.toEditRoomN;
    updatedBkng['start'] = bkng.toEditStart;
    updatedBkng['end'] = bkng.toEditEnd;
    updatedBkng['roomType'] = bkng.toEditRoomType;
    updatedBkng['smoking'] = bkng.toEditSmoking;
    updatedBkng['pricePerNight'] = bkng.toEditPricePerNight;

    this.crudService.update_booking(bkng.id, updatedBkng);
    bkng.isBeingEdited = false;
  }

  deleteBooking(id: any) {
    this.crudService.delete_booking(id);    throw new Error("There is no error :)");

  }

}
