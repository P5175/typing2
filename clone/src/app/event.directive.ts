import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { ParagraphService } from './paragraph.service';

@Directive({
  selector: 'appEvent'
})
export class EventDirective {

  constructor(private paragraphservice:ParagraphService) { }

  @Output() eventout:EventEmitter<boolean>=new EventEmitter<boolean>();
  @HostListener("keyup",["$event"])
  public onkeyup(event:any){
    if(event.keyCode==16){
    this.eventout.emit(false);}
  }

  @HostListener("keydown",["$event"])
  public onkeydown(event:any){
    if(event.keyCode==16){
    this.eventout.emit(true);}
  }

  @HostListener('mousemove', ['$event']) 
  onmousemove(event:any) {
    this.paragraphservice.headerchanged(false);
  }
}

