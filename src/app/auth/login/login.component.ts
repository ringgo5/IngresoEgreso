import { Component, OnDestroy, OnInit } from '@angular/core';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//ngrx
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';


import { AuthService } from 'src/app/services/auth.service';
import * as actions from 'src/app/shared/ui.actions';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginform: FormGroup;
  cargando:boolean = false;
  uiSubscription: Subscription;
  

  //loading:
  

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private store: Store<AppState>,
              private router:Router) { }
  
  ngOnInit(): void {

    this.loginform=this.fb.group({
      email:['', [Validators.email]],
      password:['',[Validators.required]]
    });


   this.uiSubscription= this.store.select('ui')
                      .subscribe(ui=>{this.cargando=ui.isloading;
                    //  console.log("loading")
                    }); //creamos cargando,la copia de isloading, y le decimos = a como este isloading

  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
  

  loginUsuario(){

    if (this.loginform.invalid) { return; }

    //metemos aqui el isloading:
    this.store.dispatch(actions.isLoading())
    /* Swal.fire({
      title: 'Auto close alert!',
      didOpen: ()=>{
        Swal.showLoading();
       
      }
    }) */

    const {email, password} = this.loginform.value //ojo con el value

    this.authService.loginUsuario(email,password)
    .then(credenciales=>{
      console.log(credenciales);
    //  Swal.close(); //cerramos el loading ojo con el ()
    //PONEMOS LA ACCION DE CERRARLOADING:
      this.store.dispatch(actions.stopLoading());
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
        this.store.dispatch(actions.stopLoading());  //tb lo pongo aqui,ya que quiero que se acabe si nos equivocamos en los datos o cualqier otro error

      }
      
      )

  }
}


