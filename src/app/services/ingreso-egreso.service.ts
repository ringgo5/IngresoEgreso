import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { Firestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { IngresoEgreso } from 'models/ingreso-modelo.model';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private angularFireStore: AngularFirestore,
              private Authservice:AuthService,
              ) { 

  }

  crearIngresoEgreso(ingresoegreso1:IngresoEgreso){

    let uid = this.Authservice.user.uid

    this.angularFireStore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoegreso1})
    .then((ref)=>{
      console.log('exito',ref)
    })
    .catch(err=>console.warn(err))


  }
  initIngresosEgresosListener(uid:string){ //esto es para el puntp 102,cargar items desde fire
    this.angularFireStore.collection(`${uid}/ingresos-egresos/items`).valueChanges()
    .subscribe(algo=>{console.log(algo)})
  }
}
