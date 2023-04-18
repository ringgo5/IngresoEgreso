import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import * as IngresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  userSub: Subscription
  itemsSub: Subscription
 

  constructor(private store:Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService){}




  ngOnDestroy(): void {
    this.userSub?.unsubscribe() //ya que el usuario puede cerrar sesion,y si lo hace, necesitamos quitarnos de la suscripcion.Por eso
      //creamos la variable userSub, para suscribir todo lo de abajo y poder cerrarla aquí
    this.itemsSub?.unsubscribe()
      
  }
  ngOnInit(){
    
    this.userSub=this.store.select('user')
    .pipe(
      filter(auth=>auth.user!=null) //si no hago esta validacion, cuando entramos en el dashboard, aparece primero user como null,ya que 
      //no ha hecho login aun,de esta manera filtramos solo cuando user no sea null
    )
    .subscribe(({user})=>{
      console.log(user);
      this.itemsSub=this.ingresoEgresoService.initIngresosEgresosListener(user.uid) //con esto obtenemos toda la lista de items,nos sucribimos y hacemos el store dispatch
      //hay que suscribirse en un obersvable para que se dispare
      .subscribe(ingresosEgresosFB=>{
       // console.log(ingresosEgresosFB)
        this.store.dispatch(IngresoActions.setItems({items:ingresosEgresosFB}))
      })
    })
    
  }

}
