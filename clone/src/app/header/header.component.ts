import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ParagraphService } from '../paragraph.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  constructor(private paragraphservice: ParagraphService) {

  }
  ngAfterViewInit(): void {


  }

  openmodal: boolean = false;
  ngOnInit(): void {

this.paragraphservice.typedata="word";

    this.paragraphservice.headerchange.subscribe(res => {
    
      this.headervisible = res
    });
    // console.log(this.timer);
    //  console.log(this.headervisible);

  }
  selectedtype: string = "time";

  timer: number = 15;
  word: number = 1;
  headervisible: boolean = false;


  
  change(event: any) {
    // console.log(event.target.value);

    if (event.target.value != 0) {
      if (this.selectedtype == 'type') {
        this.timer = event.target.value;
        console.log(this.timer);
      }
      else {
        this.word = event.target.value;
      }
      //  console.log(event.target.value);

      this.paragraphservice.valuechanged(event.target.value);

    }
    else {
    
      this.openmodal = true;
      this.paragraphservice.modalchanged(this.openmodal);
    }

  }

  click(event: any) {
    if (event.target.value == 0) {
      this.openmodal = true;
      this.paragraphservice.modalchanged(this.openmodal);
    }
  }
  change1(event: any) {
    console.log(event.target.value);

    this.paragraphservice.typechanged(event.target.value);

  }
}
