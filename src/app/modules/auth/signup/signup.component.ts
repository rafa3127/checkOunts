import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup
  errorMSG: string | null = null
  loading: boolean = false
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router
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
    this.loading = true
    if(this.form.valid){
      this.auth.SignUp(this.form.value.email, this.form.value.password).then( (result) => {
        this.ngZone.run( () => {
          this.router.navigate(["home"])
          this.auth.SetUserData(result.user, this.form.value.name)
          this.loading = false
        })
      }).catch( ({code}) => {
        this.errorMSG = this.auth.errors[code] ? this.auth.errors[code] : "Hubo un error inesperado. Intentelo de nuevo más tarde"
        this.loading = false
      })
    }
  }

}
