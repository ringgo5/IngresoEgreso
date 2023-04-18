import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
//import { AuthGuard } from '../services/auth.guard';
//modulos:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const rutasHijas: Routes=[
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
   // canActivate: [ //aqui recibe todas las reglas que queramos.Estamos en creacion de guard
        //AuthGuard no lo vamos a usar aun ya que necesitamos que solo CARGUE si se ha autenticado
   // ]
    
  }

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(rutasHijas)
  ],
  exports:[
    RouterModule
  ]
})
export class DashboardRoutesModule { }
