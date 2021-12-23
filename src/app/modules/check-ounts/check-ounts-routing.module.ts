import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckOuntComponent } from './check-ount/check-ount.component';
import { AddNewPayComponent } from './check-ount/counts/add-new/add-new.component';
import { AddNewComponent } from './check-ount/expenses/add-new/add-new.component';

import { CheckOuntsPage } from './check-ounts.page';

const routes: Routes = [
  {
    path: '',
    component: CheckOuntsPage
  },
  {
    path: 'co/:id',
    component: CheckOuntComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckOuntsPageRoutingModule {}
