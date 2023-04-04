import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  

  //loading:
  

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
    Swal.fire({
      title: 'Auto close alert!',
      didOpen: ()=>{
        Swal.showLoading();
       
      }
    })

    const {email, password} = this.loginform.value //ojo con el value

    this.authService.loginUsuario(email,password)
    .then(credenciales=>{
      console.log(credenciales);
      Swal.close(); //cerramos el loading ojo con el ()
      this.router.navigate(['/']);
     
    })
    .catch(
      //err=>console.error(err) este es el que teniamos 
      err=>
      { //todo esto es de sweetalert2
        Swal.fire({
         icon: 'error',
         title: 'opps..',
         text : err.message
          
        })

      }
      
      )

  }
}
