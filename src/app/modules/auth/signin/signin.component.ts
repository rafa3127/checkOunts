import { Component, OnInit } from '@angular/core';
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
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
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
    this.auth.GoogleAuth()
  }

  loginEmail() {
    if (this.form.valid) {
      this.auth.SignIn(
        this.form.value.email,
        this.form.value.password
      );
    }
  }
}

