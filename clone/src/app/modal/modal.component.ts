import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ParagraphService } from '../paragraph.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements AfterViewChecked {
constructor(private paragraphservice:ParagraphService){
  
}
  
  ngAfterViewChecked(): void {
  const modal_input: HTMLDivElement = this.modal_input.nativeElement;
 
  
  modal_input.focus()
}
@ViewChild('modal_input') modal_input!: ElementRef;
inputval:number=0;
onclick(){
  
  this.paragraphservice.valuechanged(this.inputval);
  this.paragraphservice.modalchanged(false);
 
;}
}
