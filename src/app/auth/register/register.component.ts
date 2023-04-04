import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup;
  constructor(private fb: FormBuilder,
            private authService: AuthService,
            private router:Router) { } //esta linea activo la navegacion por rutas,luego la pongo abajo


  ngOnInit(): void {

    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.email], // no se porque si pongo Validators.required,validators.email me da error
      password: ['', Validators.required]
    });

  }
  crearUsuario() {
    Swal.fire({
      title: 'Auto close alert!',
      didOpen: ()=>{
        Swal.showLoading();
       
      }
    })

    // console.log(this.registroForm),
    // console.log(this.registroForm.valid),
    // console.log(this.registroForm.value)
    if (this.registroForm.invalid) { return; }
    const { nombre, correo, password } = this.registroForm.value;
  //  console.log(this.registroForm.value)
    this.authService.crearUsuario(nombre, correo, password)
      .then(credenciales => {
        console.log(credenciales);
        Swal.close(); //cerramos el loading ojo con el ()
        this.router.navigate(['/']);//con esto navegamos a la raíz si registramos a un usuario correcto
      })
      .catch(err => Swal.fire({
        title: 'Sweet!',
        text: err.message,
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      }));
  }

}
