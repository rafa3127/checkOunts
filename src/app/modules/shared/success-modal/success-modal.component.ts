import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss'],
})
export class SuccessModalComponent implements OnInit {
  msg: string = ""
  route: string = ""
  constructor(
    private modalController: ModalController,
    private params: NavParams,
    private router: Router,
  ) { }

  ngOnInit() {
    this.msg = this.params.get("msg")
  }

  dismiss(){
    this.modalController.dismiss({
      "dismissed": true
    })
    this.router.navigate([this.route])
  }

}
