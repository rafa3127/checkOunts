import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { FormAlertComponent } from './form-alert/form-alert.component';
import { BalanceCardComponent } from './balance-card/balance-card.component';
import { LastExpensesComponent } from './last-expenses/last-expenses.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { SectionTitleComponent } from './section-title/section-title.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { CheckountsListComponent } from './checkounts-list/checkounts-list.component';





@NgModule({
  declarations: [
    MenuComponent,
    FormAlertComponent,
    BalanceCardComponent,
    LastExpensesComponent,
    HeaderComponent,
    LogoComponent,
    SectionTitleComponent,
    ModalHeaderComponent,
    SuccessModalComponent,
    FabButtonComponent,
    CheckountsListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ],
  exports: [
    MenuComponent,
    FormAlertComponent,
    BalanceCardComponent,
    LastExpensesComponent,
    HeaderComponent,
    LogoComponent,
    SectionTitleComponent,
    ModalHeaderComponent,
    SuccessModalComponent,
    FabButtonComponent,
    CheckountsListComponent,
  ]
})
export class SharedModule { }
