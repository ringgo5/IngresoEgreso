import { Injectable } from '@angular/core';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/compat/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  constructor(public auth:AngularFireAuth,
              /*private firestore: AngularFirestore*/) { }
/*  initAuthListener(){
    this.auth.authState.subscribe()
  }   */        

  crearUsuario(nombre:string, correo:string, password:string){
     return (this.auth.createUserWithEmailAndPassword(correo,password))
      //console.log(nombre,email,password)
      //this.auth.signInWithEmailAndPassword(email,password)
      
  }
  loginUsuario(email:string, password:string){


   return (this.auth.signInWithEmailAndPassword(email,password))

  }
}
