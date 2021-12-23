import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddNewComponent } from '../expenses/add-new/add-new.component';

@Component({
  selector: 'app-expenses-footer',
  templateUrl: './expenses-footer.component.html',
  styleUrls: ['./expenses-footer.component.scss'],
})
export class ExpensesFooterComponent implements OnInit {
  @Input() userTotalExpenses: number = 0
  @Input() COTotalExpenses: number = 0
  @Input() checkOunt: any = {}
  constructor(
    private modalController: ModalController
  ) {}

  ngOnInit() {}


  async presentModal() {
    const modal = await this.modalController.create({
      component: AddNewComponent, 
      componentProps: {checkOunt: this.checkOunt}
    });
    return await modal.present();
  }

}
