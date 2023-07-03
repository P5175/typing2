import { Component, OnChanges, OnDestroy, OnInit, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ParagraphService } from './paragraph.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practice'



  @ViewChild('combine')
  combine!: ElementRef;
  @ViewChild('modalDiv') modalDiv!: ElementRef;


  constructor(private paragraphservice: ParagraphService) {

  }
  
  ngOnInit(): void {

    this.paragraphservice.modalchange.subscribe(res => {
      const divElement: HTMLDivElement = this.combine.nativeElement;
      const modalDiv: HTMLDivElement = this.modalDiv.nativeElement;
      if (res == true) {
        divElement.style.display = 'none';
        modalDiv.style.display = 'block';
      } else {
        divElement.style.display = 'block';
        modalDiv.style.display = 'none';
      }
    })
  }



}
