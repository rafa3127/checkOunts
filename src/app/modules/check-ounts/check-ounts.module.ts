import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckOuntsPageRoutingModule } from './check-ounts-routing.module';

import { CheckOuntsPage } from './check-ounts.page';
import { CheckOuntComponent } from './check-ount/check-ount.component';
import { ExpensesComponent } from './check-ount/expenses/expenses.component';
import { CountsComponent } from './check-ount/counts/counts.component';
import { AddNewComponent } from './check-ount/expenses/add-new/add-new.component';
import { AddNewPayComponent } from './check-ount/counts/add-new/add-new.component';
import { ExpenseComponent } from './check-ount/expenses/expense/expense.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckOuntsPageRoutingModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  declarations: [
    CheckOuntsPage, 
    CheckOuntComponent, 
    ExpensesComponent, 
    CountsComponent, 
    AddNewComponent,
    AddNewPayComponent,
    ExpenseComponent,
  ]
})
export class CheckOuntsPageModule {}
