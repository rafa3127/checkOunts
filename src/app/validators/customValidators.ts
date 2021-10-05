import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export class customValidators {
    static negativeAmount(control: AbstractControl){
        const amount = control.value
        const valid = amount>=0
        return valid ? null : {negativeAmount: true};

    }
    
}
