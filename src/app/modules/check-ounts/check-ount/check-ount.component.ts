import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';

@Component({
  selector: 'app-check-ount',
  templateUrl: './check-ount.component.html',
  styleUrls: ['./check-ount.component.scss'],
})
export class CheckOuntComponent implements OnInit {
  params:any
  section: any = {e: true, c:false}
  user: any
  constructor(
    private activePath: ActivatedRoute,
    public checkOunts: CheckountsService,
    private expenses: ExpensesService
  ) {
    this.params = this.activePath.snapshot.params.id
    this.checkOunts.getCheckOuntByID(this.params)
    this.expenses.getExpensesByCheckOunt(this.params)
    this.user = JSON.parse(localStorage.getItem('user'))
   }

  ngOnInit() {
  }

  selectExpenses(){
    this.section.e = true
    this.section.c = false
  }

  selectCounts(){
    this.section.e = false
    this.section.c = true
  }

}
