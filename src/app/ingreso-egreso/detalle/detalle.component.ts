import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'models/ingreso-modelo.model';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import {IngresoEgresoService} from '../../services/ingreso-egreso.service'
import Swal from 'sweetalert2';
import { Usuario } from 'models/usuario.model';
//import {OrdenIngresoPipe} from '../../pipes/orden-ingreso.pipe';
 
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit,OnDestroy {
 

    ingresosEgresos:IngresoEgreso[]=[];
    ingresoEgresoSuscripcion:Subscription;
    usuario:Usuario;
  

  constructor(private store:Store<AppState>,
              private ingresoEgresoService:IngresoEgresoService){}
 


  ngOnInit(): void {
    this.ingresoEgresoSuscripcion=this.store.select('ingresoEgreso').subscribe(/*ingresos*/ ({items})=>{
     // console.log(items)
      this.ingresosEgresos=items
     
      
     // console.log(this.ingresosEgresos)
     // console.log(items)
    }
    )
    
  }
  ngOnDestroy(): void {
    
    this.ingresoEgresoSuscripcion.unsubscribe()
   
  }




  borrar(id:any){

    
    //console.log(this.ingresosEgresos)
    //console.log(this.ingresosEgresos)

  /*  for(let x = 0;x<=this.ingresosEgresos.length;x++){
      console.log(this.ingresosEgresos[x])
    }*/

    this.ingresoEgresoService.borrarIngresoEgreso(id)
    .then(() =>Swal.fire('borrado', 'item borrado', 'warning'))
    .catch(err =>Swal.fire('error', err.message, 'error'))


}

}
