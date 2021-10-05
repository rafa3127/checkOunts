import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { PaysService } from 'src/app/core/services/pays.service';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.scss'],
})
export class CountsComponent implements OnInit {
  i: number = 0
  payList:Array<any> = []
  constructor(
    public checkOunts: CheckountsService,
    private pays: PaysService
  ) { }
  
  ngOnInit() {
    this.pays.getPaysByCheckOunt(this.checkOunts.selectedID)
    this.dataSets = []
    this.labels = []
    var colors = []
    var borderColors = []
    this.checkOunts.selected.users.forEach( user => {
      var data = {label: user.name, 
        data: user.balance}
        this.dataSets.push(data.data)
        this.labels.push(data.label)
        colors.push(data.data > 0? "rgba(6,160,6,0.3)" : "rgba(255,0,0,0.3)" )
        borderColors.push(data.data > 0? "rgba(6,160,6,1)" : "rgba(255,0,0,1)" )
      })
      this.colors =[{backgroundColor:colors},{borderColors: borderColors}]
      
      this.chargeData()
  }

  //chart Varaibles
  public type: ChartType ='horizontalBar';
  dataSets: any
  labels: any
  colors: any
  public options: ChartOptions = {
    tooltips: {axis: 'x'},
    elements: {rectangle: {borderWidth: 2}},
    responsive: true,
    plugins: {legend: false}
  }

  //functions
  chargeData(){
    if(this.pays.pays.length == 0){
      setTimeout(() => {
        this.i++
        if(this.i < 40){
          this.chargeData()
        }
      }, 500);
    }else{
      this.listPays()
    }
  }
  listPays(){
    this.pays.pays.forEach(pay =>{
      var data = pay.payload.doc.data()
      var p = {
        amount: data.amount,
        id: pay.payload.doc.id,
        payer: this.checkOunts.selected.users.filter( user => user.id == data.userID)[0].name,
        receptor: this.checkOunts.selected.users.filter( user => user.id == data.receptorID)[0].name,
        payerEmail: this.checkOunts.selected.users.filter( user => user.id == data.userID)[0].email,
        receptorEmail: this.checkOunts.selected.users.filter( user => user.id == data.receptorID)[0].email,
      }
      this.payList.push(p)
    })
  }


}
