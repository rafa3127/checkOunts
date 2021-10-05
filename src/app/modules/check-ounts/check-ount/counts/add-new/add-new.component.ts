import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckountsService } from 'src/app/core/services/checkounts.service';
import { PaysService } from 'src/app/core/services/pays.service';
import { customValidators } from 'src/app/validators/customValidators';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss'],
})
export class AddNewPayComponent implements OnInit {
  form: FormGroup
  constructor(
    private fb: FormBuilder,
    public checkOunts: CheckountsService,
    private pays: PaysService
  ) {

    this.form = this.createForm()
   }

  ngOnInit() {
  }

  createForm():FormGroup{
    var form:any = this.fb.group({
      userID: ['',Validators.compose([
        Validators.required,
      ])],
      receptorID: ['',Validators.compose([
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
    if(this.form.valid){
      var pay = this.form.value
      pay.checkOuntID = this.checkOunts.selectedID
      this.pays.createPay(pay)
    }
  }


}
