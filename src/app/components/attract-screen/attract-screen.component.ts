import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-attract-screen',
  templateUrl: './attract-screen.component.html',
  styleUrls: ['./attract-screen.component.scss'],
   imports: [
    RouterModule,
    ButtonModule      
  ],
})
export class AttractScreenComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
