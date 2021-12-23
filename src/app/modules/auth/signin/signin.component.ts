import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup
  errorMSG: string | null = null
  loading: boolean = false
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone
  ) { 
    this.form = fb.group({})
  }

  ngOnInit() {
    this.form = this.createForm()
    if(localStorage.getItem('user') != null && localStorage.getItem('user') != undefined){
      this.router.navigateByUrl('/home')
    }
  }

  createForm():FormGroup{
    var form:any = this.fb.group({
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


  loginGoogle(){
    this.loading = true
    this.auth.googleSignIn().then( (result) => {
      this.ngZone.run(
        () => { this.router.navigate(["home"])}
      )
      this.auth.SetUserData(result)
      this.loading = false
    }).catch( ({code}) => {
      this.errorMSG = this.auth.errors[code] ? this.auth.errors[code] : "Hubo un error inesperado. Intentelo de nuevo más tarde"
      this.loading = false
    })
  }

  loginEmail() {
    this.loading = true
    if (this.form.valid) {
      this.auth.SignIn(this.form.value.email, this.form.value.password).then( (result) => {
        this.ngZone.run( () => {
          this.router.navigate(["home"])
          this.auth.SetUserData(result.user, this.form.value.name)
          this.loading = false
        })
      }).catch(({code}) => {
        this.errorMSG = this.auth.errors[code] ? this.auth.errors[code] : "Hubo un error inesperado. Intentelo de nuevo más tarde"
        this.loading = false
      })
      }else{
        this.errorMSG = "Los datos enviados no son válidos. Revisa el formulario"
        this.loading = false
    }
  }



  
}

