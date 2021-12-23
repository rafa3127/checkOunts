import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { ExpensesService } from 'src/app/core/services/expenses.service';
import { SuccessModalComponent } from 'src/app/modules/shared/success-modal/success-modal.component';
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
  checkOunt: any = {}
  loading: boolean = false
  errorMSG: string | null = null
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private expenses: ExpensesService,
    private params: NavParams,
    private modalController: ModalController
  ) { 
    this.form = fb.group({})
    this.formUsers = fb.group({})
    this.arrayControls = []
    this.checkOunt = this.params.get("checkOunt")
  }
  
  ngOnInit() {
    this.form = this.createForm()
    this.formUsers = this.createFormUsers()
    this.arrayControls = (this.formUsers.controls.uForm as FormArray).controls
  }

  createForm():FormGroup{
    var form:any = this.fb.group({
      userEmail: ['',Validators.compose([
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
    var users = this.checkOunt.payload.data().users
    users.forEach(user => {
      var f: any = this.fb.group({
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
   
   calculated(email: string = ""){
    email != "" ? this.changeAmounts.push(email) : email = "";
     var total = this.form.controls["amount"].value
     this.total = total
     var users = this.arrayControls
     var count = users.length
     users.forEach( user => {
       if(this.changeAmounts.includes(user.controls["email"].value)){
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
        this.changeAmounts = []
      }else{        
        var divAmount = total/(count)
        users.forEach( user => {
          if(!(this.changeAmounts.includes(user.controls["email"].value))){
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
    this.loading = true 
    if(this.form.valid && this.formUsers.valid){
      var expense = this.form.value
      expense.checkOuntID = this.checkOunt.payload.id
      expense.payers = []
      var users = this.arrayControls
      users.forEach(user => {
        var payer = {userName:"",userEmail:"",amount: 0}
        payer.userName = user.controls["name"].value
        payer.userEmail = user.controls["email"].value
        payer.amount = user.controls["amount"].value
        expense.payers.push(payer)
      });
      this.expenses.createExpense(expense, this.checkOunt).then( res => {
        this.presentModal()
        this.modalController.dismiss({
          "dismissed": true
        })
        this.loading = false
      }).catch(err => {
        this.errorMSG = "No se pudo crear el gasto. Intente de nuevo más tarde"
        this.loading = false
      })
      this.router.navigateByUrl("/check-ounts/co/"+this.checkOunt.payload.id)
      this.expenses.getExpensesByCheckOunt(this.checkOunt.payload.id)
    }else{ 
      this.errorMSG = "No se pudo crear el gasto.Revise los datos e intente de nuevo"
      this.loading = false
    }
   }

   headerBackButton(){
    this.modalController.dismiss({
      "dismissed": true
    })
   }

   async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent, 
      componentProps: {msg: "El Gasto se ha creado correctamente",
                       route: `/check-ounts/co/${this.checkOunt.payload.id}`}
    });
    return await modal.present();
  }

}
