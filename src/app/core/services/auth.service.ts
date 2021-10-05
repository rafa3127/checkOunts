import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import firebase from 'firebase/compat/app';
// import 'rxjs/add/operator/switchMap';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { CheckountsService } from './checkounts.service';
import { ExpensesService } from './expenses.service';
import { PaysService } from './pays.service';

@Injectable()
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone,
    private checkOunts: CheckountsService,
    private expenses: ExpensesService,
    private pays: PaysService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email, password) {
    console.log("in")
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user)
        this.router.navigateByUrl('/home')
        this.checkOunts.readCheckOunts(result.user.email)
        this.expenses.getExpensesByUser(result.user.email)
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  SignUp(email, password, name) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        result.user.updateProfile({displayName: name})
        .then(
          () => {
            this.SetUserData(result.user).then(
              () => {
                this.router.navigateByUrl("/home")
                this.checkOunts.readCheckOunts(result.user.email)
                this.expenses.getExpensesByUser(result.user.email)
              })
          }
        ) 
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // SendVerificationMail() {
  //   return this.afAuth.updateCurrentUser
  //   .then(() => {
  //     this.router.navigateByUrl('/auth/verifyUser');
  //   })
  // }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  GoogleAuth() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      result => {
        this.router.navigateByUrl('/home')
        this.checkOunts.readCheckOunts(result.user.email)
        this.expenses.getExpensesByUser(result.user.email)
        
          
        })
  }

  // Auth logic to run auth providers
  // AuthLogin(provider) {
  //   return this.afAuth.signInWithPopup(provider)
  //   .then((result) => {
  //      this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //     this.SetUserData(result.user);
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user')
      this.router.navigateByUrl('auth/signin');
      // this.checkOunts.checkOunts = []
      // this.checkOunts.checkOuntBalance = 0
      // this.checkOunts.checkOuntExpenses = []
      // this.checkOunts.checkOuntTotalExpenses = 0
      // this.checkOunts.checkOuntUserID = ""
      // this.checkOunts.selected = {}
      // this.checkOunts.selectedID = ""
      // this.checkOunts.user = {}
      // this.checkOunts.userTotalBalance = 0
      // this.expenses.expenses = []
      // this.expenses.selected = {}
      // this.expenses.user = {}
      // this.pays.pays = []      
    })
  }


}