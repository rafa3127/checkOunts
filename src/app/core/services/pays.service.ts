import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CheckountsService } from './checkounts.service';

@Injectable({
  providedIn: 'root'
})
export class PaysService {
  pays: Array<any> = []
  constructor(
    private afs: AngularFirestore,
    private checkOunts: CheckountsService
  ) { }

  createPay(pay, checkOunt){
    return new Promise((resolve, reject) => {      
      this.afs.collection("pays").add(pay).catch(() => {reject("error"); return})
      var users = checkOunt.payload.data().users
      users.forEach(user => {
        if(user.email === pay.userEmail){
          user.balance = user.balance + pay.amount
        }
        if(user.email === pay.receptorEmail){
          user.balance = user.balance - pay.amount
        }
      });
      this.afs.collection("checkOunts").doc(checkOunt.payload.id).set({users: users}, {merge: true}).catch(() => {reject("error"); return})
      resolve("succes")
    })
  }

  getPaysByCheckOunt(id:string){
    return this.afs.collection("pays", ref => ref.where('checkOuntID',"==",id)).snapshotChanges()
  }

  deletePayById(id: string){
    return new Promise((resolve, reject) => {
      this.afs.collection("pays").doc(id).get().subscribe( pay => {
        this.afs.collection("checkOunts").doc(pay.data()["checkOuntID"]).get().subscribe( (co) => {
          var users = co.data()["users"]
          users.forEach(user => {
            if(user.email === pay.data()["userEmail"]){
              user.balance = user.balance - pay.data()["amount"]
            }
            if(user.email === pay.data()["receptorEmail"]){
              user.balance = user.balance + pay.data()["amount"]
            }
        })
        this.afs.collection("checkOunts").doc(co.id).set({users:users},{merge:true}).then( () =>{
          this.afs.collection("pays").doc(id).delete()
          .then(()=>{resolve("succes");return})})
          .catch(err =>{reject("error"); return})
        .catch(err =>{reject("error"); return})
        },err =>{reject("error"); return})
      },err =>{reject("error"); return})
    })
  }
}
