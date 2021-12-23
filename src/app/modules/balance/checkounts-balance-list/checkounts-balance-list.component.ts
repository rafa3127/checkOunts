import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkounts-balance-list',
  templateUrl: './checkounts-balance-list.component.html',
  styleUrls: ['./checkounts-balance-list.component.scss'],
})
export class CheckountsBalanceListComponent implements OnInit {
  @Input() checkOunts: Array<any> = []
  @Input() user: any = {}
  @Input() loading : boolean = false
  @Input() errorMSG: string | null = null
  constructor() { }

  ngOnInit() {}

}
