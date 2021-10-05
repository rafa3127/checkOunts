import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup
  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { 
    this.form = fb.group({})
  }

  ngOnInit() {
    this.form = this.createForm()
    
  }

  createForm():FormGroup{
    var form:any = this.fb.group({
      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(60),
        Validators.pattern("[A-Za-zÁÉÍÓÚáéíóúÑñ ]*")      ])
      ],
      email: ['',Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['',Validators.compose([
        Validators.required
      ])],  
    })
    return form
  }

  signupEmail(){
    if(this.form.valid){
      this.auth.SignUp(this.form.value.email, this.form.value.password, this.form.value.name)
    }
  }

}
