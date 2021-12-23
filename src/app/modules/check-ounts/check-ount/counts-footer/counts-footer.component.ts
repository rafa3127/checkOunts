import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNewPayComponent } from '../counts/add-new/add-new.component';

@Component({
  selector: 'app-counts-footer',
  templateUrl: './counts-footer.component.html',
  styleUrls: ['./counts-footer.component.scss'],
})
export class CountsFooterComponent implements OnInit {
  @Input() userBalance: number = 0
  @Input() COTotalExpenses: number = 0
  @Input() checkOunt: any = {}
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddNewPayComponent, 
      componentProps: {checkOunt: this.checkOunt}
    });
    return await modal.present();
  }

}
