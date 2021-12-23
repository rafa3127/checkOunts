import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss'],
})
export class BalanceCardComponent implements OnInit {

  @Input() balance: number = 0
  constructor() { }

  ngOnInit() {}

}
