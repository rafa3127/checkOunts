import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BalancePageRoutingModule } from './balance-routing.module';

import { BalancePage } from './balance.page';
import { SharedModule } from '../shared/shared.module';
import { CheckountsBalanceListComponent } from './checkounts-balance-list/checkounts-balance-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BalancePageRoutingModule,
    SharedModule
  ],
  declarations: [
    BalancePage,
    CheckountsBalanceListComponent,
  ]

})
export class BalancePageModule {}
