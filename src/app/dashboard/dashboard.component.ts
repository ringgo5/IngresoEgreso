import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit,OnDestroy {

  userSub: Subscription

  constructor(private store:Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService){}




  ngOnDestroy(): void {
    this.userSub.unsubscribe() //ya que el usuario puede cerrar sesion,y si lo hace, necesitamos quitarnos de la suscripcion.Por eso
      //creamos la variable userSub, para suscribir todo lo de abajo y poder cerrarla aquí
  }
  ngOnInit(){
    
    this.userSub=this.store.select('user')
    .pipe(
      filter(auth=>auth.user!=null) //si no hago esta validacion, cuando entramos en el dashboard, aparece primero user como null,ya que 
      //no ha hecho login aun,de esta manera filtramos solo cuando user no sea null
    )
    .subscribe(({user})=>{
      console.log(user);
      this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
    })
    
  }

}
