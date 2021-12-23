import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {
  @Input() routerLink: string = ""
  constructor() { }

  ngOnInit() {}

}
