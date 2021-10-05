import { Injectable } from '@angular/core';
import { CheckOunt } from '../models/checkounts';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ExpensesService } from './expenses.service';

@Injectable({
  providedIn: 'root'
})
export class CheckountsService {
  checkOunts: Array<any>
  checkOuntBalance: any
  checkOuntExpenses: any
  checkOuntTotalExpenses: any
  checkOuntUserID: string = ""
  selected: any
  selectedID: any
  user:any = JSON.parse(localStorage.getItem('user'))
  userTotalBalance: number = 0
  constructor(
    private afs: AngularFirestore,
  ) { 
    this.checkOunts = []
    this.checkOuntBalance = 0
    // this.readCheckOunts()
  }

  getCheckOuntByID(id: string){
    this.selected = this.afs.collection("checkOunts").doc(id)
    .snapshotChanges().subscribe( cos =>{
      this.selected = cos.payload.data()
      this.selectedID = cos.payload.id
      var totalExpenses = 0 
      this.selected.users.forEach(user =>{
        if(user.email == this.user.email){
          this.checkOuntUserID = user.id
          this.checkOuntBalance = user.balance
          this.checkOuntExpenses = user.expenses
        }
        totalExpenses += user.expenses
      })
      this.checkOuntTotalExpenses = totalExpenses
    })
  }


  createCheckOunt(co: CheckOunt){
    return new Promise<any>((resolve,reject) =>
    {
      this.afs.collection("checkOunts").add(co)
      .then(res => {
      }, err => reject(err))
    }
    )
  }

  readCheckOunts(email: string = this.user.email){
    this.checkOunts = []
    this.afs.collection("checkOunts", ref => ref.where('usersMails',"array-contains", email))
    .snapshotChanges().subscribe( cos =>{
      this.checkOunts = cos
      var totalBalance = 0
      this.checkOunts.forEach(co =>{
        var balance = co.payload.doc.data().users.filter(user => user.email == email)[0]["balance"]
        totalBalance = totalBalance + balance
      })
      this.userTotalBalance = totalBalance
    })
    return this.checkOunts
  }


  
}
