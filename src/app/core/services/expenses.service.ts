import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { expense } from '../models/expense';
import { CheckountsService } from './checkounts.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenses: Array<any>
  userExpenses: any = []
  cos: any
  user:any = JSON.parse(localStorage.getItem('user'))
  constructor(
    private afs: AngularFirestore,
    private checkOunts: CheckountsService,
  ) { }

  getExpenseByID(id:string){
  }

  createExpense(expense, checkOunt){
    return new Promise((resolve, reject) => {
      this.afs.collection("expenses").add(expense).then( res => {
        var users = checkOunt.payload.data().users
        users.forEach(user => {
          expense.payers.forEach(payer => {
            if(user.email === payer.userEmail){
              user.balance = user.balance - payer.amount
              user.expenses = user.expenses + payer.amount
              if(user.email === expense.userEmail){
                user.balance = user.balance + expense.amount
              }
            }
          });
        });
        this.afs.collection("checkOunts").doc(checkOunt.payload.id).set({users: users}, {merge: true})
        .then( () => {resolve("success"); return
        }).catch( () => {reject("error"); return})
      }).catch( () => {reject("error"); return})
    })
    
  }

  getExpensesByCheckOunt(id:string){
    return this.afs.collection("expenses", ref => ref.where('checkOuntID',"==",id)).snapshotChanges()
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
        var userEmail = data.users.filter(user => user.email == email)[0].email
        cosIDs.push({id: id, name: name, userEmail: userEmail})
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

  deleteExpenseById(id:string){
    return new Promise((resolve, reject) => {
      this.afs.collection("expenses").doc(id).get().subscribe((exp) => {
        this.afs.collection("checkOunts").doc(exp.data()["checkOuntID"]).get().subscribe( (co) => {
          const payer = {
            email: exp.data()["userEmail"],
            amount: exp.data()["amount"]
          }
          const payers = exp.data()["payers"]
          const users = co.data()["users"]
          users.forEach(u => {
            if(payer.email === u["email"]){
              u["balance"] -= payer.amount
            }   
            payers.forEach(p => {
              if(p["userEmail"]===u["email"]){
                u["balance"] += p["amount"]
                u["expenses"] -= p["amount"]
              }
            })
          })
          this.afs.collection("checkOunts").doc(exp.data()["checkOuntID"]).set({users:users},{merge:true})
          .then( () => {this.afs.collection("expenses").doc(id).delete()
            .then(()=>{resolve("succes");return})})
            .catch(err =>{reject("error"); return})
          .catch(err =>{reject("error"); return})
        }, err =>{reject("error"); return})
      }, err =>{reject("error"); return})
    })
  }

}


  

