import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  @Input() payList:Array<any> = []
  @Input() errorMSG: string | null = null
  @Input() loading: boolean = false
  @Input() users: Array<any> = []
  @Input() checkOuntID: string = ""
  @Output() deletePay: EventEmitter<string> = new EventEmitter<string>()
  constructor(
    public checkOunts: CheckountsService,
    private pays: PaysService,
    private afs: AngularFirestore
  ) { }
  
  ngOnInit() {
    this.chargeDataChart()
    this.afs.collection("checkOunts").doc(this.checkOuntID).snapshotChanges().subscribe(
      () => {
        this.chargeDataChart()
      }
    )
  }

  //chart Varaibles
  dataSets: any
  labels: any
  colors: any

  chargeDataChart(){
    this.dataSets = []
    this.labels = []
    var colors = []
    var borderColors = []
    this.users.forEach( user => {
      var data = {label: user.name, 
        data: user.balance}
        this.dataSets.push(data.data)
        this.labels.push(data.label)
        colors.push(data.data > 0? "rgba(6,160,6,0.3)" : "rgba(255,0,0,0.3)" )
        borderColors.push(data.data > 0? "rgba(6,160,6,1)" : "rgba(255,0,0,1)" )
      })
      this.colors =[{backgroundColor:colors},{borderColors: borderColors}]
  }

  delete(id:string){
    this.deletePay.emit(id)
  }

}
