import { Component, OnInit } from '@angular/core';
import { CheckountsService } from 'src/app/core/services/checkounts.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  user = JSON.parse(localStorage.getItem('user'))
  constructor(
    public checkOunts: CheckountsService
  ) {

   }

  ngOnInit() {
  }

}
