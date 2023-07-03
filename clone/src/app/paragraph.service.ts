import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParagraphService {

  constructor() { }

  typedata:string="time";
  data: String[] = [

    `bali and lombok are neighbouring islands; nice to meet you my name is pratham butani hello brothers good bali and lombok are neighbouring islands; nice to meet you my name is pratham butani hello brothers good`,
    `martin luther king jr.led it is good nice to meet you my name is pratham butani hello brothers good`
  ]

  @Output() valuechange = new EventEmitter();
  valuechanged(event: any) {
    this.valuechange.emit(event);
    console.log("valuechange" + event);

  }

  @Output() headerchange = new EventEmitter();
  headerchanged(event: any) {
    this.headerchange.emit(event);
    // console.log("callled"+event);

  }
  @Output() modalchange = new EventEmitter();
  modalchanged(event: any) {
    this.modalchange.emit(event)
  }

  @Output() typechange = new EventEmitter();
  typechanged(event: any) {
    this.typechange.emit(event)
  }
}


