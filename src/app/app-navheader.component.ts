import { Component, OnInit, Input  } from '@angular/core';


@Component({
  selector: 'app-navheader',
  templateUrl: './app-navheader.component.html'
})

export class AppNavheaderComponent implements OnInit {
  @Input() titlepage: String;
  @Input() subtitlepage: String;

  constructor( ) {}
  userId: String = '';
  ngOnInit(): void {
    console.log(' AppNavheaderComponent => titlepage' + this.titlepage);
    console.log(' AppNavheaderComponent => userId' + this.userId);
  }

}
