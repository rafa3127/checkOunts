import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { PaysService } from 'src/app/core/services/pays.service';

@Component({
  selector: 'app-check-ount',
  templateUrl: './check-ount.component.html',
  styleUrls: ['./check-ount.component.scss'],
})
export class CheckOuntComponent implements OnInit {
  params:any = this.activePath.snapshot.params.id
  section: any = {e: true, c:false}
  user: any = JSON.parse(localStorage.getItem('user'))
  COTotalExpenses: number = 0
  userTotalExpenses: number = 0
  userBalance: number = 0
  checkOunt: any = {}
  loading: boolean = false
  payList: Array<any> = []
  expensesList: Array<any> = []
  errorMSG: string | null = null
  constructor(
    private activePath: ActivatedRoute,
    private checkOuntService: CheckountsService,
    private expensesService: ExpensesService,
    private paysService: PaysService,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCheckOunt()
  }

  selectSection(event: string){
    if(event == "expenses"){
      this.section.e = true
      this.section.c = false
    }
    if(event == "counts"){
        this.section.e = false
        this.section.c = true
      }

    }
  
  getPayList(){

  }

  getCheckOunt(){
    this.loading = true
    const prom = new Promise((resolve, reject) => {
      this.checkOuntService.getCheckOuntByID(this.params).subscribe( co =>{
        if(!co.payload.exists){
          reject("!exists")
          return
        }
        this.checkOunt = co
        this.COTotalExpenses = 0
        co.payload.data()["users"].forEach(user  => {
          this.COTotalExpenses += user["expenses"]
          if(this.user.email == user["email"]){
            this.userTotalExpenses = user["expenses"]
            this.userBalance = user["balance"]
          }
          this.expensesService.getExpensesByCheckOunt(this.params).subscribe( res => {
            this.expensesList = res
            this.paysService.getPaysByCheckOunt(this.params).subscribe( (res) =>{
              this.payList = res
              resolve("succes")
            },err => {
              reject("error")
            })
            
          }, err => {
            reject("error")
          })
        });
      }, err => reject("error"))
    })

    prom.then(
      (msg) => {this.loading = false}
    ).catch(
      (err) => {
        if(err == "!exists"){
          this.errorMSG = "El checkOunt no Existe"
          this.loading=false
        }else{
          this.loading=false
          this.errorMSG = "No se pudieron cargar los datos. Intente de nuevo."
        }
      }
    )
  }

  deleteExpense(id: string){
    this.loading = true
    this.expensesService.deleteExpenseById(id)
    .then( (res) => {
      this.toast.create({
        message: 'Se ha eliminado el Gasto Correctamente',
        position: 'bottom',
        color: 'success',
        duration: 5000
      }).then( (toast) => {
        toast.present()
      })
      this.loading = false
    }).catch( (error) => {
      this.toast.create({
        message: 'no se ha podido eliminar el gasto. Intente de nuevo más tarde',
        position: 'bottom',
        color: 'danger',
        duration: 5000
      }).then( (toast) => {
        toast.present()
        this.loading = false
      })})
  }

  deletePay(id: string){
    this.loading = true
    this.paysService.deletePayById(id)
    .then( (res) => {
      this.toast.create({
        message: 'Se ha eliminado el Pago Correctamente',
        position: 'bottom',
        color: 'success',
        duration: 5000
      }).then( (toast) => {
        toast.present()
      })
      this.loading = false
    }).catch( (error) => {
      this.toast.create({
        message: 'no se ha podido eliminar el Pago. Intente de nuevo más tarde',
        position: 'bottom',
        color: 'danger',
        duration: 5000
      }).then( (toast) => {
        toast.present()
        this.loading = false
      })})
  }

}
