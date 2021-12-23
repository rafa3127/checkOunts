import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.scss'],
})
export class BalanceChartComponent implements OnInit {
  @Input() labels: any = {}
  @Input() dataSets: any = {}
  @Input() colors: any = {}

  public type: ChartType ='horizontalBar';
  public options: ChartOptions = {
    tooltips: {axis: 'x'},
    elements: {rectangle: {borderWidth: 2}},
    responsive: true,
    plugins: {legend: false}
  }
  constructor() { }

  ngOnInit() {}

}
