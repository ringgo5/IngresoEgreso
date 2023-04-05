import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

    {path: 'login', component:LoginComponent}, //ponemos la rutas aquí, Una para login,otra para register.
    {path: 'register', component:RegisterComponent},
    {
      path: '',
      component: DashboardComponent,
      children: dashboardRoutes,
      canActivate: [ //aqui recibe todas las reglas que queramos.Estamos en creacion de guard
          AuthGuard
      ]
      
    }, //esta para el dashboard,la necesitamos porque es la que carga una vez te registras/inicias sesion
    {path: '**', redirectTo:''} //esto indica que cualquier otra ruta ira al dashboard tb

];

@NgModule({                                                     
  imports: [RouterModule.forRoot(routes)],  //esto y lo de abajo ya venía configurado
  exports: [RouterModule]
})
export class AppRoutingModule { }  //debemos exportar este nombre a app.module.ts para indicarle que ya dispone de rutas
