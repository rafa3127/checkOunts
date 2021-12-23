import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewPageRoutingModule } from './add-new-routing.module';

import { AddNewPage } from './add-new.page';
import { SharedModule } from '../../shared/shared.module';
import { CheckOuntDataComponent } from './check-ount-data/check-ount-data.component';
import { ParticipantsDataComponent } from './participants-data/participants-data.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddNewPage,CheckOuntDataComponent,ParticipantsDataComponent]
})
export class AddNewPageModule {}
