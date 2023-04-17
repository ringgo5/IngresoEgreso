import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//import { Firestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { IngresoEgreso } from 'models/ingreso-modelo.model';
import { AuthService } from './auth.service';
import { map } from 'rxjs';



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
   return this.angularFireStore.collection(`${uid}/ingresos-egresos/items`) //esto lo pongo una vez marco el suscribe(algo) de abajo
    .snapshotChanges()
    //.subscribe(algo=>{console.log(algo)})
    .pipe(
      map(snapshot=>{ //con esto le paso un filtro y devuielvo lo que quiero,por ejemplo un true.El map transforma lo que queramos
                //lo recibiremos abajo, como algo(en este caso)
          // console.log(snapshot)//vemos que el id esta en documento.payload.doc.id
        return snapshot.map(doc=>{ //aqui pondremos lo que queramos que se vea. Buscamos en elementos,dentro de herram de desarro(DOM) y ponemos
          //la estructura abajo
         // console.log(doc.payload.doc.data());
          
         // const data:{}=doc.payload.doc.data() si no queremos crear una variable podemos ponerlo asi:
          //...doc.payload.doc.data() as any
          return{
            //abc:123
            uid:doc.payload.doc.id,
            ...doc.payload.doc.data() as any

            //...data (en caso que creemos un variable)
            
          }
        })
      })
    )
   // .subscribe(algo=>{console.log(algo)})  //para fiines de pruebas
  }

  borrarIngresoEgreso(uidItem:any){
    let uid = this.Authservice.user.uid //para borrar tuve que primero localizar comosacar el uid, y vi que era mediante uidItem y luego
    //con punto podia acceder al uid. Ya pudiendo acceder lo meto delante del delete y listo!
    //esto me llevo varios dias,ya que me salía vacio todo el rato, y era que no estaba accediendo bien
    console.log(uidItem.uid)

    return this.angularFireStore.doc(`${uid}/ingresos-egresos/items/${uidItem.uid}`).delete()
    

  }
}
