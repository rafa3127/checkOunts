import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any
  constructor(
    private auth: AuthService,
    private utilities: UtilitiesService,
    public checkOunts: CheckountsService,
    public expenses: ExpensesService
  ) 
  {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.expenses.getExpensesByUser()
  }
  
  ngOnInit() {}

}
