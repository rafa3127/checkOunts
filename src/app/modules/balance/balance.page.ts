import { Component, OnInit } from '@angular/core';
import { CheckountsService } from 'src/app/core/services/checkounts.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  user = JSON.parse(localStorage.getItem('user'))
  checkOunts: Array<any> = []
  loading: boolean = false
  errorMSG: string | null = null
  userBalance: number = 0
  constructor(
    public checkOuntsService: CheckountsService
  ) {

   }

  ngOnInit() {
    this.getCheckOunts()
  }

  getCheckOunts(){
    this.loading = true
    this.checkOuntsService.getCheckOunts(this.user.email).subscribe( co => {
      var balance = 0
      co.forEach( c => {
        balance += c.payload.doc.data()["users"].filter(u => u.email === this.user.email)[0]["balance"]
      })
      this.userBalance = balance
      this.checkOunts = co
      this.loading = false
    }, err => {
      this.errorMSG = "No se pudo cargar la lista de checkOunts. Intente de Nuevo más tarde"
      this.loading = false
    }
    )
  }

}
