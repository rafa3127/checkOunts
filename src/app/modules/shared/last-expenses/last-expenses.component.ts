import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-expenses',
  templateUrl: './last-expenses.component.html',
  styleUrls: ['./last-expenses.component.scss'],
})
export class LastExpensesComponent implements OnInit {

  @Input() expenses: Array<any> = []
  constructor() { }

  ngOnInit() {}

}
