import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {
  form: FormGroup
  formUsers: FormGroup
  arrayControls: Array<any>
  user = JSON.parse(localStorage.getItem("user"))
  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private checkOunts: CheckountsService,
    private router: Router,
    private auth: AuthService
  ) { 
    this.form = fb.group({})
    this.formUsers = fb.group({})
    this.arrayControls = []
  }

  ngOnInit() {
    this.form = this.createForm()
    this.formUsers = this.createFormUsers()
    this.arrayControls = (this.formUsers.controls.uForm as FormArray).controls
  }


  createForm():FormGroup{
    var form:any = this.fb.group({
      name: ['',Validators.compose([
        Validators.required,
        Validators.pattern("[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ() ]*"),
        Validators.maxLength(50)
      ])],
      description: ['',Validators.compose([
        Validators.pattern("[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ() ]*"),
        Validators.maxLength(120)
      ])],  
    })
    return form
   }
   createFormUsers(): FormGroup{
    var form:any = this.fb.group({
      uForm: this.fb.array([]),
    })
    var arr = form.get('uForm') as FormArray
    var f: any = this.fb.group({
      name:[this.user.displayName,Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*' )
      ])],
      email:[this.user.email,Validators.compose([
        Validators.required,
        Validators.email
      ])]});
    arr.push(f)
    return form
   }
   addUser(){
    var f: any = this.fb.group({
      name:['',Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*' )
      ])],
      email:['',Validators.compose([
        Validators.required,
        Validators.email
      ])]});
    (this.formUsers.controls.uForm as FormArray).push(f)
  }
  removeUser(i: any){
    (this.formUsers.controls.uForm as FormArray).removeAt(i)
  }
   onSubmit(){
     if(this.form.valid && this.formUsers.valid){
       var co = this.form.value
       co.id = this.utilities.generateID()
       var users = this.formUsers.value.uForm
       co.usersMails = []
       for(var user of users){
         user.id = this.utilities.generateID()
         user.balance = 0
         user.expenses = 0
         co.usersMails.push(user.email)
       }
       co.currency = "USD"
       co.users = users
       this.checkOunts.createCheckOunt(co)
       this.router.navigateByUrl('/check-ounts')
     }
   }

}
