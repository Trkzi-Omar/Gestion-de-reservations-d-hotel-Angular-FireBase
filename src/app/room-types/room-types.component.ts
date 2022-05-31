import {Component, OnInit} from '@angular/core';
import {CrudService} from "../service/crud.service";

@Component({
  selector: 'app-room-types',
  templateUrl: './room-types.component.html',
  styleUrls: ['./room-types.component.css']
})
export class RoomTypesComponent implements OnInit {
  roomTypes: any;
type : string|null=null;
  constructor(public crudService:CrudService) {
  }

  ngOnInit(): void {
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
  createRoomType() {
    let RoomType: { [index: string]: any } = {};
    if (this.type != null ) {
      RoomType['type'] = this.type;
      console.log(RoomType);
      this.crudService.create_newRoomType(RoomType).then(res => {
        this.type = null;
      }).catch(error => (console.log(error)));
    }
  }

  editRoomType(rmType: any) {
    rmType.isBeingEdited = true
    rmType.toEditType = rmType.type;
    console.log(rmType);
    throw new Error("There is no error :)");

  }

  updateRoomType(rmType: any) {
    let updatedrmType: { [index: string]: any } = {};
    updatedrmType['type'] = rmType.toEditType;
    this.crudService.update_RoomType(rmType.id, updatedrmType);
    rmType.isBeingEdited = false;
  }

  deleteRoomType(id: any) {
    this.crudService.delete_RoomType(id);    throw new Error("There is no error :)");
  }

}
