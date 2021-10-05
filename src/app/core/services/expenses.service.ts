import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { expense } from '../models/expense';
import { CheckountsService } from './checkounts.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenses: Array<any>
  selected: any
  userExpenses: any = []
  cos: any
  user:any = JSON.parse(localStorage.getItem('user'))
  constructor(
    private afs: AngularFirestore,
    private checkOunts: CheckountsService,
  ) { }

  getExpenseByID(id:string){
  }
  createExpense(expense){
    this.afs.collection("expenses").add(expense)
    var users = this.checkOunts.selected.users
    users.forEach(user => {
      expense.payers.forEach(payer => {
        if(user.id == payer.userID){
          user.balance = user.balance - payer.amount
          user.expenses = user.expenses + payer.amount
          if(user.id == expense.userID){
            user.balance = user.balance + expense.amount
          }
        }
      });
    });
    this.afs.collection("checkOunts").doc(this.checkOunts.selectedID).set({users: users}, {merge: true})
  }

  getExpensesByCheckOunt(id:string){
    this.expenses = []
    this.afs.collection("expenses", ref => ref.where('checkOuntID',"==",id))
    .snapshotChanges().subscribe( exps =>{
      this.expenses = exps
      console.log(exps[0].payload.doc.id)
      console.log(exps[1].payload.doc.id)
    })
  }

  getExpensesByUser(email: string = this.user.email){
    this.afs.collection("checkOunts", ref => ref.where('usersMails',"array-contains",email))
    .snapshotChanges().subscribe( cos =>{
      var cosIDs = []
      var expInf = []
      this.cos = cos
      this.cos.forEach(co => {
        var id = co.payload.doc.id
        var data = co.payload.doc.data()
        var name = data.name
        var userID = data.users.filter(user => user.email == email)[0].id
        cosIDs.push({id: id, name: name, userID: userID})
      });
      var cosIDList = []
      var cosuserIDList = []
      cosIDs.forEach(co => {
        cosIDList.push(co.id)
        cosuserIDList.push(co.userID)
      })

    this.afs.collection("expenses", ref => ref
    .where("checkOuntID","in", cosIDList)).snapshotChanges().subscribe( exps => {
      this.cos = exps
      this.cos.forEach( exp =>{
        var data = exp.payload.doc.data()
        expInf.push({
          coName:  cosIDs.filter(a => a.id == data.checkOuntID)[0].name ,
          concept: data.concept,
          amount: data.payers.filter(payer => cosuserIDList.includes(payer.userID))[0].amount
        })
      })
    })
    this.userExpenses = expInf
    return expInf
  })
  }

}


  

