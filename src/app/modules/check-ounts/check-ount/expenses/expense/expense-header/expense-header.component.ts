import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-header',
  templateUrl: './expense-header.component.html',
  styleUrls: ['./expense-header.component.scss'],
})
export class ExpenseHeaderComponent implements OnInit {
  @Input() expense: any = {}
  @Input() payFor: string = ""
  constructor() { }

  ngOnInit() {}

}
