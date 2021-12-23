import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { SuccessModalComponent } from '../../shared/success-modal/success-modal.component';

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
  loading: boolean = false
  errorMSG: string | null = null

  constructor(
    private fb: FormBuilder,
    private utilities: UtilitiesService,
    private checkOunts: CheckountsService,
    private modalController: ModalController,
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
    this.loading = true
    if(this.form.valid && this.formUsers.valid){
      var co = this.form.value
      var users = this.formUsers.value.uForm
      co.usersMails = []
      for(var user of users){
        user.balance = 0
        user.expenses = 0
        co.usersMails.push(user.email)
      }
      co.currency = "USD"
      co.users = users
      this.checkOunts.createCheckOunt(co).then( (res) => {
        this.presentModal()
        this.loading = false
      }).catch((err) => {
        this.errorMSG = "Ha ocurrido un error al intentar crear el checkOunt, intentalo de nuevo"
        this.loading = false
      })
    }else{
      this.errorMSG = "Ha ocurrido un error al crear un CheckOunt. Revise los datos he intente de nuevo"
      this.loading = false
    }
  }

   async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalComponent, 
      componentProps: {msg: "El CheckOunt se ha creado correctamente", route: "check-ounts"}
    });
    return await modal.present();
  }
}
