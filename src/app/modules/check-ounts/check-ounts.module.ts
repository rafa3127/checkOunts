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
import { SharedModule } from '../shared/shared.module';
import { ToolbarButtonsComponent } from './check-ount/toolbar-buttons/toolbar-buttons.component';
import { ExpensesFooterComponent } from './check-ount/expenses-footer/expenses-footer.component';
import { CountsFooterComponent } from './check-ount/counts-footer/counts-footer.component';
import { RouterModule } from '@angular/router';
import {ExpenseHeaderComponent} from './check-ount/expenses/expense/expense-header/expense-header.component'
import { ExpenseListComponent } from './check-ount/expenses/expense/expense-list/expense-list.component';
import { BalanceChartComponent } from './check-ount/counts/balance-chart/balance-chart.component';
import { PaysListComponent } from './check-ount/counts/pays-list/pays-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckOuntsPageRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    CheckOuntsPage, 
    CheckOuntComponent, 
    ExpensesComponent, 
    CountsComponent, 
    AddNewComponent,
    AddNewPayComponent,
    ExpenseComponent,
    ToolbarButtonsComponent,
    ExpensesFooterComponent,
    CountsFooterComponent,
    ExpenseHeaderComponent,
    ExpenseListComponent,
    BalanceChartComponent,
    PaysListComponent,
  ]
})
export class CheckOuntsPageModule {}
