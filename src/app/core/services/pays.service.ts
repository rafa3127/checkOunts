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

  createPay(pay){
    this.afs.collection("pays").add(pay)
    var users = this.checkOunts.selected.users
    users.forEach(user => {
      
      if(user.id == pay.userID){
        user.balance = user.balance + pay.amount
      }
      if(user.id == pay.receptorID){
        user.balance = user.balance - pay.amount
      }
    });
    ;
    this.afs.collection("checkOunts").doc(this.checkOunts.selectedID).set({users: users}, {merge: true})
  }

  getPaysByCheckOunt(id:string){
    this.pays = []
    this.afs.collection("pays", ref => ref.where('checkOuntID',"==",id))
    .snapshotChanges().subscribe( pays =>{
      this.pays = pays
    })
  }
}
