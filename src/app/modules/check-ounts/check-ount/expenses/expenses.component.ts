import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { ExpenseComponent } from './expense/expense.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
})
export class ExpensesComponent implements OnInit {
  expensesList: Array<any>
  i:  number = 0
  constructor(
    private expenses: ExpensesService,
    public checkOunts: CheckountsService,
    public modalController: ModalController
    ) {
      this.expensesList = []
     }

  ngOnInit() {
    this.chargeData()
  }

  chargeData(){
    if(this.expenses.expenses.length == 0){
      setTimeout(() => {
        this.i++
        if(this.i < 40){
          this.chargeData()
        }
      }, 500);
    }else{
      this.listExpenses()
    }
  }

  listExpenses(){
    console.log(this.expenses.expenses)
    this.expenses.expenses.forEach(expense => {
      var data = expense.payload.doc.data()
      var exp = {concept: data.concept,
                 id: expense.payload.doc.id,
                 amount: data.amount,
                 payFor: data.payers.filter(user => user.userID == data.userID)[0].userName,
                 myAmount: data.payers.filter(user => user.userID == this.checkOunts.checkOuntUserID)[0].amount
                }
      this.expensesList.push(exp)
    })
  }
  async presentModal(id: string) {
    const modal = await this.modalController.create({
      component: ExpenseComponent, 
      componentProps: this.expenses.expenses.filter(exp => exp.payload.doc.id == id)[0].payload.doc.data()
    });
    return await modal.present();
  }
}
