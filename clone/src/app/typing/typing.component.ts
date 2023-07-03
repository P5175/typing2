import { AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, HostListener, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ParagraphService } from '../paragraph.service';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.css']
})
export class TypingComponent implements AfterViewInit, OnInit {
  @ViewChild('paragraph') myDiv!: ElementRef;
  @ViewChild('cursorelement') cursorelement!: ElementRef;
  @ViewChild('refresh') refresh!: ElementRef;
  @ViewChild('timerdiv') timerdiv!: ElementRef;
  @ViewChild('result_main') result!: ElementRef;



  divs: number[] = [];
  i: number = 0;
  j: number = 0;
  wordl: number = 0;
  max_i: number = 0;

  paragraph: String = '';
  count: number = 0;
  shift: boolean = false;
  const_timer: number = 15;
  timer: number = this.const_timer; // Time in seconds
  max_timer: number = this.const_timer;
  wordtimer: number = 0;
  wordcount: number = 1;
  timerId: any;
  timerstart: boolean = true;
  correctword: number = 0;
  incorrectword: number = 0;
  type: string = "time";

  speed: number = 0;
  accuracy: number = 0;
  headervisible: boolean = false;


  constructor(private paragraphService: ParagraphService) {

  }

  ngOnInit(): void {
    this.paragraphService.typechange.subscribe(res => {

      this.i = 0;
      this.j = 0;
      if (!this.timerstart) {
        this.stopTimer();
        this.timerstart = true;
      }
      const cursorelement: HTMLElement = this.cursorelement.nativeElement;
      cursorelement.removeAttribute('style');

      this.type = res;
      this.paragraph = this.paragraphService.data[Math.floor(Math.random() * this.paragraphService.data.length)];
      // console.log(this.paragraph);


      this.splitParagraph();
      const divElement: HTMLDivElement = this.myDiv.nativeElement;
      const childCount: number = divElement.children.length;
      for (let i = 0; i < childCount; i++) {
        this.divs[i] = divElement.children[i].children.length;
      }

    })


    this.paragraphService.valuechange.subscribe(res => {


      if (this.type == 'time') {

        if (this.j != 0 || this.i != 0) {
          this.onclick();
        }


        this.max_timer = res;
        this.const_timer = res;
        this.timer = res;

      } else {

        this.wordcount = res;

        //  console.log(this.wordcount);


        this.paragraph = this.paragraphService.data[Math.floor(Math.random() * this.paragraphService.data.length)];

        // console.log(this.paragraph);
        this.splitParagraph();
        const divElement: HTMLDivElement = this.myDiv.nativeElement;
        const childCount: number = divElement.children.length;
        for (let i = 0; i < childCount; i++) {
          this.divs[i] = divElement.children[i].children.length;
        }

      }
    })




  }


  startTimer() {
    this.timer = this.const_timer;

    this.i = 0;
    this.j = 0;
    this.count = 0;
    this.correctword = 0;
    this.incorrectword = 0;

    if (this.wordtimer == 0 && this.type == 'word') {

      this.timerId = setInterval(() => {


        this.wordtimer++;


        console.log("word timer");



        if (this.i == this.wordcount) {


          this.const_timer = this.wordtimer;


          // this.const_timer=this.timer;
          this.stopTimer();
          const divElement: HTMLDivElement = this.myDiv.nativeElement;
          const timerdiv: HTMLDivElement = this.timerdiv.nativeElement;
          const refresh: HTMLDivElement = this.refresh.nativeElement;
          const cursorelement: HTMLDivElement = this.cursorelement.nativeElement;
          divElement.blur();
          divElement.style.visibility = 'hidden';
          timerdiv.style.visibility = 'hidden';
          refresh.style.visibility = 'hidden';
          cursorelement.style.visibility = 'hidden'
          const result: HTMLDivElement = this.result.nativeElement;
          result.style.visibility = 'visible';

        }
      }, 1000);
    }
    if (this.type == 'time' && this.timer > 0) {
      this.timerId = setInterval(() => {


        this.timer--;

        console.log("timer timer");
        console.log(this.max_i);
        console.log(this.correctword);
        console.log(this.incorrectword);


        if (this.timer === 0 || this.max_i == (this.incorrectword + this.correctword)) {

          this.const_timer -= this.timer;

          this.stopTimer();
          const divElement: HTMLDivElement = this.myDiv.nativeElement;
          const timerdiv: HTMLDivElement = this.timerdiv.nativeElement;
          const refresh: HTMLDivElement = this.refresh.nativeElement;
          const cursorelement: HTMLDivElement = this.cursorelement.nativeElement;
          divElement.blur();
          divElement.style.visibility = 'hidden';
          timerdiv.style.visibility = 'hidden';
          refresh.style.visibility = 'hidden';
          cursorelement.style.visibility = 'hidden'
          const result: HTMLDivElement = this.result.nativeElement;
          result.style.visibility = 'visible';

        }
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.timerId);
    // Handle timer completion or other actions
    this.timer = this.max_timer;
    this.wordtimer = 0;

  }


  ngAfterViewInit(): void {


    this.paragraph = this.paragraphService.data[Math.floor(Math.random() * this.paragraphService.data.length)];


    this.splitParagraph();
    const divElement: HTMLDivElement = this.myDiv.nativeElement;
    const childCount: number = divElement.children.length;
    for (let i = 0; i < childCount; i++) {
      this.divs[i] = divElement.children[i].children.length;
    }


    divElement.focus();




  }


  splitParagraph() {
    const divElement: HTMLDivElement = this.myDiv.nativeElement;
    const words: string[] = this.paragraph.split(' ');

    divElement.textContent = '';
    if (this.type == 'time') {

      this.max_i = words.length;
      for (let i = 0; i < words.length; i++) {
        const wordDiv = document.createElement('div');
        const word = words[i];

        for (let j = 0; j < word.length; j++) {
          const letterSpan = document.createElement('span');
          letterSpan.textContent = word[j];
          wordDiv.appendChild(letterSpan);
        }

        divElement.appendChild(wordDiv);
      }
    } else {
      for (let i = 0; i < this.wordcount; i++) {
        const wordDiv = document.createElement('div');
        const word = words[i];
        this.max_i = words.length;
        if (word && word.length) {
          for (let j = 0; j < word.length; j++) {
            const letterSpan = document.createElement('span');
            letterSpan.textContent = word[j];
            wordDiv.appendChild(letterSpan);
          }
        }

        divElement.appendChild(wordDiv);
      }

    }

  }


  onclick() {
    this.i = 0;
    this.headervisible = false;
    this.paragraphService.headerchanged(this.headervisible);
    const divElement: HTMLDivElement = this.myDiv.nativeElement;
    divElement.textContent = '';
    this.paragraph = this.paragraphService.data[Math.floor(Math.random() * this.paragraphService.data.length)];
    // console.log(this.paragraph);

    this.splitParagraph();


    divElement: HTMLDivElement = this.myDiv.nativeElement;
    const childCount: number = divElement.children.length;
    for (let i = 0; i < childCount; i++) {
      this.divs[i] = divElement.children[i].children.length;
    }
    const cursorelement: HTMLElement = this.cursorelement.nativeElement;
    cursorelement.removeAttribute('style');
    // divElement.focus();
    // cursorelement.style.left = '27px';
    // cursorelement.style.top = '12px';

    divElement.focus();

    if (!this.timerstart) {
      this.stopTimer();
      this.timerstart = true;
      this.timer = this.max_timer;
      this.const_timer = this.max_timer



    }

  }

  onclick2() {
    const divElement: HTMLDivElement = this.myDiv.nativeElement;
    const timerdiv: HTMLDivElement = this.timerdiv.nativeElement;
    const refresh: HTMLDivElement = this.refresh.nativeElement;
    const cursorelement: HTMLDivElement = this.cursorelement.nativeElement;

    divElement.style.visibility = 'visible';
    timerdiv.style.visibility = 'visible';
    refresh.style.visibility = 'visible';
    cursorelement.style.visibility = 'visible'
    const result: HTMLDivElement = this.result.nativeElement;
    result.style.visibility = 'hidden';

    this.onclick();
  }

  shiftdown(event: any) {
    this.shift = event;
  }
  shiftup(event: any) {
    this.shift = event;
  }


  keydown(e: KeyboardEvent) {
    if (this.type == 'time') {
      this.headervisible = true;
      this.paragraphService.headerchanged(this.headervisible);
      if (this.timerstart) {

        this.startTimer();
        this.timerstart = false;
      }

      if (e.keyCode == 16) {
        return
      }
      const divElement: HTMLDivElement = this.myDiv.nativeElement;
      this.wordl = this.divs[this.i];


      if (this.wordl != this.j) {




        console.log(this.incorrectword);
        console.log(this.correctword);
        console.log(this.max_i);
        
        


        //  const enteredletter=this.shift?e.key.toUpperCase():e.key;


        if (e.key == divElement.children[this.i].children[this.j].textContent) {



          divElement.children[this.i].children[this.j].classList.add('sucess');
          const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


          const cursorelement: HTMLElement = this.cursorelement.nativeElement;
          cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';

          if ( divElement.children[this.i].querySelectorAll(".error").length == 0 && this.i + 1 == this.max_i && this.j == this.wordl - 1 ) {
          console.log("entered that condition");
          
              this.i++;
              this.count = 0;
              this.j = 0;
              this.correctword += 1;
            
            if (this.i < this.max_i) {
              const first: HTMLElement = divElement.children[this.i - 1] as HTMLElement;
              const second: HTMLElement = divElement.children[this.i] as HTMLElement;

              if (first.offsetTop == second.offsetTop) {

                const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


                const cursorelement: HTMLElement = this.cursorelement.nativeElement;
                cursorelement.style.left = letterelement.offsetLeft + 'px';
              }
              else {
                const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


                const cursorelement: HTMLElement = this.cursorelement.nativeElement;
                cursorelement.style.left = letterelement.offsetLeft + 'px';
                cursorelement.style.top = letterelement.offsetTop + 10 + 'px';
              }
            }
          }
        } else if (e.keyCode == 8) {

          if (this.j != 0) {
            this.j--;
            divElement.children[this.i].children[this.j].classList.remove('sucess');
            divElement.children[this.i].children[this.j].classList.remove('error');
            const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
            this.j--;
          } else {
            this.j--;
          }
        }
        else {

          divElement.children[this.i].children[this.j].classList.add('error');
          const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


          const cursorelement: HTMLElement = this.cursorelement.nativeElement;
          cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
        }
        this.j++;
      }
      else if (e.keyCode == 32) {

        this.i++;
        this.count = 0;
        this.j = 0;

        if (divElement.children[this.i - 1].querySelectorAll(".error").length == 0) {
          this.correctword++;


        } else {
          this.incorrectword++;


        }

        if (this.i < this.max_i) {
          const first: HTMLElement = divElement.children[this.i - 1] as HTMLElement;
          const second: HTMLElement = divElement.children[this.i] as HTMLElement;

          if (first.offsetTop == second.offsetTop) {

            const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
          }
          else {
            const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
            cursorelement.style.top = letterelement.offsetTop + 10 + 'px';
          }
        }

      } else if (e.keyCode == 8 && this.count == 0) {


        const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;

        const cursorelement: HTMLElement = this.cursorelement.nativeElement;
        cursorelement.style.left = letterelement.offsetLeft + 'px';

        this.j--;

        divElement.children[this.i].children[this.j].classList.remove('sucess');
        divElement.children[this.i].children[this.j].classList.remove('error');

      } else if (e.keyCode == 8 && this.count != 0) {

        var parent = divElement.children[this.i];
        if (parent != null) {
          var last = parent.lastChild;
          if (last != null) {



            const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
            parent.removeChild(last);
            this.count--;
            // new
            if (this.i != 0) {



              const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


              const cursorelement: HTMLElement = this.cursorelement.nativeElement;
              cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
              cursorelement.style.top = letterelement.offsetTop + 10 + 'px';

            }

          }
        }

      }
      else {




        divElement.children[this.i].innerHTML += '<span class="error">' + e.key + '</span>';




        this.count++;
        const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;



        const first: HTMLElement = divElement.children[this.i - 1] as HTMLElement;
        const second: HTMLElement = divElement.children[this.i] as HTMLElement;

        if (this.i != 0) {
          if (first.offsetTop == second.offsetTop) {


            const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
          }
          else {


            const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
            cursorelement.style.top = letterelement.offsetTop + 10 + 'px';
          }
        }
        else {
          const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


          const cursorelement: HTMLElement = this.cursorelement.nativeElement;
          cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
        }
      }
    }

    // this is the word condition

    if (this.type == 'word') {
      // console.log(this.max_i);

      this.headervisible = true;
      this.paragraphService.headerchanged(this.headervisible);
      if (this.timerstart) {

        this.startTimer();
        this.timerstart = false;
      }

      if (e.keyCode == 16) {
        return
      }
      const divElement: HTMLDivElement = this.myDiv.nativeElement;
      this.wordl = this.divs[this.i];


      // console.log(this.wordl);
      // console.log(this.j);

      if (this.wordl != this.j) {







        //  const enteredletter=this.shift?e.key.toUpperCase():e.key;

        if (e.key == divElement.children[this.i].children[this.j].textContent) {



          divElement.children[this.i].children[this.j].classList.add('sucess');
          const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


          const cursorelement: HTMLElement = this.cursorelement.nativeElement;
          cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
          if (this.i + 1 == this.wordcount && this.j == this.wordl - 1) {
            console.log("entered");

            if (divElement.children[this.i].querySelectorAll(".error").length == 0) {
              this.i++;
              this.count = 0;
              this.j = 0;
              this.correctword += 1;
            }
            if (this.i < this.max_i) {
              const first: HTMLElement = divElement.children[this.i - 1] as HTMLElement;
              const second: HTMLElement = divElement.children[this.i] as HTMLElement;

              if (first.offsetTop == second.offsetTop) {

                const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


                const cursorelement: HTMLElement = this.cursorelement.nativeElement;
                cursorelement.style.left = letterelement.offsetLeft + 'px';
              }
              else {
                const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


                const cursorelement: HTMLElement = this.cursorelement.nativeElement;
                cursorelement.style.left = letterelement.offsetLeft + 'px';
                cursorelement.style.top = letterelement.offsetTop + 10 + 'px';
              }
            }
          }
        } else if (e.keyCode == 8) {

          if (this.j != 0) {
            this.j--;
            divElement.children[this.i].children[this.j].classList.remove('sucess');
            divElement.children[this.i].children[this.j].classList.remove('error');
            const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
            this.j--;
          } else {
            this.j--;
          }
        }
        else {

          divElement.children[this.i].children[this.j].classList.add('error');
          const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


          const cursorelement: HTMLElement = this.cursorelement.nativeElement;
          cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
        }
        this.j++;
      }
      else if (e.keyCode == 32) {
        // console.log("here");

        this.i++;
        this.count = 0;
        this.j = 0;

        if (divElement.children[this.i - 1].querySelectorAll(".error").length == 0) {
          this.correctword++;


        } else {
          this.incorrectword++;


        }

        if (this.i < this.wordcount) {
          const first: HTMLElement = divElement.children[this.i - 1] as HTMLElement;
          const second: HTMLElement = divElement.children[this.i] as HTMLElement;

          if (first.offsetTop == second.offsetTop) {

            const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
          }
          else {
            const letterelement: HTMLElement = divElement.children[this.i].children[this.j] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
            cursorelement.style.top = letterelement.offsetTop + 10 + 'px';
          }
        }

      } else if (e.keyCode == 8 && this.count == 0) {


        const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;

        const cursorelement: HTMLElement = this.cursorelement.nativeElement;
        cursorelement.style.left = letterelement.offsetLeft + 'px';

        this.j--;

        divElement.children[this.i].children[this.j].classList.remove('sucess');
        divElement.children[this.i].children[this.j].classList.remove('error');

      } else if (e.keyCode == 8 && this.count != 0) {

        var parent = divElement.children[this.i];
        if (parent != null) {
          var last = parent.lastChild;
          if (last != null) {



            const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + 'px';
            parent.removeChild(last);
            this.count--;
            // new
            if (this.i != 0) {



              const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


              const cursorelement: HTMLElement = this.cursorelement.nativeElement;
              cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
              cursorelement.style.top = letterelement.offsetTop + 10 + 'px';

            }

          }
        }

      }
      else {




        divElement.children[this.i].innerHTML += '<span class="error">' + e.key + '</span>';




        this.count++;
        const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;



        const first: HTMLElement = divElement.children[this.i - 1] as HTMLElement;
        const second: HTMLElement = divElement.children[this.i] as HTMLElement;

        if (this.i != 0) {
          if (first.offsetTop == second.offsetTop) {


            const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
          }
          else {


            const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


            const cursorelement: HTMLElement = this.cursorelement.nativeElement;
            cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
            cursorelement.style.top = letterelement.offsetTop + 10 + 'px';
          }
        }
        else {
          const letterelement: HTMLElement = divElement.children[this.i].children[this.j + this.count - 1] as HTMLElement;


          const cursorelement: HTMLElement = this.cursorelement.nativeElement;
          cursorelement.style.left = letterelement.offsetLeft + letterelement.offsetWidth + 'px';
        }
      }
    }
  }
}
