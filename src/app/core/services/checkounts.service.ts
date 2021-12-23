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
  }

  getCheckOuntByID(id: string){
    return this.afs.collection("checkOunts").doc(id)
    .snapshotChanges()
  }


  createCheckOunt(co: CheckOunt){
    return this.afs.collection("checkOunts").add(co)
  }

  getCheckOunts(email: string = this.user.email){
    return this.afs.collection("checkOunts", ref => ref.where('usersMails',"array-contains", email))
    .snapshotChanges()
  }

  deleteCheckOunt(id: string){
    return new Promise((resolve, reject) => {
      this.afs.collection("checkOunts").doc(id).snapshotChanges().subscribe(co => {
        let users = co.payload.data()["users"]
        if(users.filter(u => u.email == this.user.email)[0]["balance"] != 0){
          reject("balanceError")
          return
        }
        users = users.filter(u => u.email != this.user.email)
        if(users.length == 0){
          this.afs.collection("checkOunts").doc(id).delete()
          .then( () => {resolve("deleted"); return})
          .catch( () => {reject("error"); return})
        }else{
          try{
            const userEmails = co.payload.data()["usersMails"].filter(u => u != this.user.email)
            this.afs.collection("checkOunts").doc(id).set({users: users, usersMails: userEmails}, {merge : true})
            .then( () =>{ resolve("user deleted from checkOunt"); return})
            .catch( () => {reject("error");return})
          }catch{
            () => {reject("error"); return}
          }
        }
      }, err => {reject("error"); return})
    })
     
  }

  
}
