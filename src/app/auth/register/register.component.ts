import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
//import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
//import Swal from 'sweetalert2';
import * as actions from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  

  registroForm: FormGroup;
  cargando:boolean = false;
  uiSubscription: Subscription;


  constructor(private fb: FormBuilder,
            private authService: AuthService,
            private store: Store<AppState>,
            private router:Router) { } //esta linea activo la navegacion por rutas,luego la pongo abajo


  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.email], // no se porque si pongo Validators.required,validators.email me da error
      password: ['', Validators.required]
    });
    
    this.uiSubscription= this.store.select('ui')
    .subscribe(ui=>{this.cargando=ui.isloading;console.log('cargando en registrar')});
    

  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe(); //con esto evitamos que se acumulen suscripciones
  }

  crearUsuario() {
    /* Swal.fire({
      title: 'Auto close alert!',
      didOpen: ()=>{
        Swal.showLoading();
       
      }
    }) */

    // console.log(this.registroForm),
    // console.log(this.registroForm.valid),
    // console.log(this.registroForm.value)
    if (this.registroForm.invalid) { return; }
    
    this.store.dispatch(actions.isLoading())

    const { nombre, correo, password } = this.registroForm.value;
  //  console.log(this.registroForm.value)
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
       // Swal.close(); //cerramos el loading ojo con el ()
       this.store.dispatch(actions.stopLoading())
        this.router.navigate(['/']);//con esto navegamos a la raíz si registramos a un usuario correcto
        
      })
      .catch(err => /* Swal.fire({
        title: 'Sweet!',
        text: err.message,
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      }) */
      this.store.dispatch(actions.stopLoading())
      ); 
  }

}
