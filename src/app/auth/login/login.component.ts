import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router) { }
  ngOnInit(): void {

    this.loginform=this.fb.group({
      email:['', [Validators.email]],
      password:['',[Validators.required]]
    });

  }

  loginUsuario(){

    if (this.loginform.invalid) { return; }
    const {email, password} = this.loginform.value //ojo con el value
    this.authService.loginUsuario(email,password)
    .then(credenciales=>{
      console.log(credenciales);
      this.router.navigate(['/']);
    })
    .catch(err=>console.error(err))

  }
}
