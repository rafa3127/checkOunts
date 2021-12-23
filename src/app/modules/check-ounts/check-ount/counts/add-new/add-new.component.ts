import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { PaysService } from 'src/app/core/services/pays.service';
import { SuccessModalComponent } from 'src/app/modules/shared/success-modal/success-modal.component';
import { customValidators } from 'src/app/validators/customValidators';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewPayComponent implements OnInit {
  form: FormGroup
  checkOunt: any = {}
  errorMSG: string | null = null
  loading: boolean = false
  constructor(
    private fb: FormBuilder,
    private pays: PaysService,
    private params: NavParams,
    private modalController: ModalController
  ) {
    this.form = this.createForm()
    this.checkOunt = this.params.get("checkOunt")
   }

  ngOnInit() {}

  createForm():FormGroup{
    var form:any = this.fb.group({
      userEmail: ['',Validators.compose([
        Validators.required,
      ])],
      receptorEmail: ['',Validators.compose([
        Validators.required,
      ])],
      amount: ['', Validators.compose([
        Validators.required,
        customValidators.negativeAmount
      ])]
    })
    return form
  }

  onSubmit(){
    this.loading = true
    if(this.form.valid){
      var pay = this.form.value
      pay.checkOuntID = this.checkOunt.payload.id
      this.pays.createPay(pay, this.checkOunt).then( () => {
        this.headerBackButton()
        this.presentModal()
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.errorMSG = "No se pudo crear el Pago. Intente de nuevo más tarde"
      })
    }else{
      this.loading = false
      this.errorMSG = "No se pudo crear el Pago. Revise los datos e intente de nuevo"
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
      componentProps: {msg: "El Pago se ha creado correctamente",
      route: `/check-ounts/co/${this.checkOunt.payload.id}`}
    });
    return await modal.present();
  }


}
