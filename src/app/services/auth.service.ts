import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import 'firebase/firestore';
import { Usuario } from 'models/usuario.model';
import { Subscription, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore'; //ojo con las rutas
import { Store } from '@ngrx/store';
import * as actions from '../auth/auth.actions';
//import {firebase} from 'firebase/firestore/lite';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSuscription: Subscription;
  
  

  constructor(public auth:AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store
              //private firebase:firebase
              /*private firestore: AngularFirestore*/) { }
/*  initAuthListener(){
    this.auth.authState.subscribe()
  }   */        

  crearUsuario(nombre:string, correo:string, password:string){
     return (this.auth.createUserWithEmailAndPassword(correo,password))
      //console.log(nombre,email,password)
      //this.auth.signInWithEmailAndPassword(email,password)
      /*metemos el modelo de usuario:
    .then(fuser=>{

        const newUser = new Usuario(fuser.user.uid)

    })*/ 
    //podemos ponerlo como arriba o usando la desestructuración:
    .then(({user})=>{
      const newUser= new Usuario(user.uid,nombre,user.email) //el email podemos cogerlo de arriba o del user,de donde queramos,ya que arriba solo se creará
      //cuando pase las validaciones,cuando sea correcto, con lo que nos vale

      //ahora añadimos el firestore: Pondremos la ruta para ese documento, que para todos sera /uid/usuario,entonces ponemos:Ojo porque debemos importar el modulo
      //correcto, si hacemos otro que no sea el ANGULARFIRESTORE, nos dara error el doc
       return this.firestore.doc(`${user.uid}/usuario`).set({ //aqui no podemos dejarlo como un objeto, debemos decir que es cada cosa para que funcione
        nombre:newUser.nombre,
        email:newUser.email,
        uid:newUser.uid
       })  /*
       tambien podria quedar así:
        return this.firestore.doc(`${user.uid}/usuario`).set(...newUser)  --) usando desestructuracion
       })
       
       */
      
    })

      
  }
  loginUsuario(email:string, password:string){


   return this.auth.signInWithEmailAndPassword(email,password)
   
  }
  logOut(){
     return (this.auth.signOut());  //el return lo ponemos para luego manejarlo como una promesa(con .then, .catch)
  }

  initAuthListener(){

    this.auth.authState.subscribe(fuser=>{ //esta suscripcion NUNCA DEBEMOS SALIR ya que es un servicio y solo se lanza 1 vez
      //console.log(fuser?.uid) //con el ? le digo que si existe,que lo ponga,si no no
      //console.log(fuser)
      //console.log(fuser?.email)
      //console.log(fuser)
      if(fuser){
        //si existe..
      this.userSuscription=  this.firestore.doc(`${ fuser.uid }/usuario`).valueChanges() ///hasta aqui es el observable,debemos subscribirnos
        .subscribe((fireStoreUser:any)=>{
          console.log(fireStoreUser)
          const user= Usuario.fromFirebase(fireStoreUser); //creamos nuestra copia
          this.store.dispatch(actions.setUser({user}))//ahora con nuestra copia lo añadimos al store y le decimos que nuestro user es el que hemos creado
        })
      }else{
        //si no existe
        this.userSuscription.unsubscribe();//finaliza suscripcion
        this.store.dispatch(actions.unSetuUser()); //
      }
      
      
      
    })
  }

  isAuth(){

   return this.auth.authState.pipe(
      map(fuser=>fuser!=null)
    )



  }
}
