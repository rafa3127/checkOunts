import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CheckountsService } from 'src/app/core/services/checkounts.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {
  expense: any
  constructor(
    private modalCtrl: ModalController,
    public params: NavParams,
    public checkOunts: CheckountsService
  ) { }

  ngOnInit(){
    this.expense = this.params.data
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  payFor(){
    return this.params.get("payers").filter(payer => payer.userID == this.params.get("userID"))[0].userName
  }


}
