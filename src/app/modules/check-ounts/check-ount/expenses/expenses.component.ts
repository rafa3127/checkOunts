import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() expensesList: Array<any> = []
  @Input() loading: boolean = false
  @Input() errorMSG: string | null = null
  @Output() delete: EventEmitter<string> = new EventEmitter<string>()
  constructor(
    public modalController: ModalController
    ) {}

  ngOnInit() {}  

  deleteExpense(id: string){
    this.delete.emit(id)
  }



  async presentModal(id: string) {
    const modal = await this.modalController.create({
      component: ExpenseComponent, 
      componentProps: this.expensesList.filter(exp => exp.payload.doc.id == id)[0].payload.doc.data()
    });
    return await modal.present();
  }
}
