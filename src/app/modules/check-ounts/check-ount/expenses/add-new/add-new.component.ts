import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { customValidators } from 'src/app/validators/customValidators';
import { ExpensesComponent } from '../expenses.component';


@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewComponent implements OnInit {
  form: FormGroup
  formUsers: FormGroup
  arrayControls: Array<any>
  total: number = 0
  changeAmounts: Array<string> = []
  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    public checkOunts: CheckountsService,
    private router: Router,
    private auth: AuthService,
    private expenses: ExpensesService,
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
      userID: ['',Validators.compose([
        Validators.required,
      ])],
      concept: ['',Validators.compose([
        Validators.pattern("[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ() ]*"),
        Validators.maxLength(50)
      ])],
      amount: ['', Validators.compose([
        Validators.required,
        customValidators.negativeAmount
      ])]
    })
    return form
   }
   createFormUsers(): FormGroup{
    var form:any = this.fb.group({
      uForm: this.fb.array([]),
    })
    var arr = form.get('uForm') as FormArray
    var users = this.checkOunts.selected.users
    users.forEach(user => {
      var f: any = this.fb.group({
        id: [user.id],
        name:[user.name],
        email:[user.email],
        amount: ['', Validators.compose([
          Validators.required,
          customValidators.negativeAmount
        ])]
      })
      arr.push(f)      
    });
    return form
   }
   
   calculated(id: string = ""){
    id != "" ? this.changeAmounts.push(id) : id = "";
     var total = this.form.controls["amount"].value
     this.total = total
     var users = this.arrayControls
     var count = users.length
     users.forEach( user => {
       if(this.changeAmounts.includes(user.controls["id"].value)){
        total = total - user.controls["amount"].value
        count = count - 1

       }
      })
      if(count == 0){
        total = 0
        users.forEach( user => {
          total = total + user.controls["amount"].value
        })
        this.total = total
      }else{        
        var divAmount = total/(count)
        users.forEach( user => {
          if(!(this.changeAmounts.includes(user.controls["id"].value))){
            user.controls["amount"].value = divAmount
            
          }
        })
      }
   }

   restartBalance(){
     this.total = 0
     var users = this.arrayControls
     users.forEach(user => {
       user.controls["amount"].value = 0
     });
   }

   onSubmit(){
    if(this.form.valid && this.formUsers.valid){
      var expense = this.form.value
      expense.checkOuntID = this.checkOunts.selectedID
      expense.payers = []
      var users = this.arrayControls
      users.forEach(user => {
        var payer = {userID:"",userName:"",userEmail:"",amount: 0}
        payer.userID = user.controls["id"].value
        payer.userName = user.controls["name"].value
        payer.userEmail = user.controls["email"].value
        payer.amount = user.controls["amount"].value
        expense.payers.push(payer)
      });
      this.expenses.createExpense(expense)
      this.router.navigateByUrl("/check-ounts/co/"+this.checkOunts.selectedID)
      this.expenses.getExpensesByCheckOunt(this.checkOunts.selectedID)
    }
   }


}
