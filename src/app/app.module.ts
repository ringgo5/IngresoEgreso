import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modulos:
import { AppRoutingModule } from './app-routing.module';

//formularioReactivo:

//import {ReactiveFormsModule} from '@angular/forms';
//angular fire:
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat';

//import {AngularFireModule} from '@angular/fire';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';

//ngrx:

import{StoreModule} from '@ngrx/store'
import{appReducers} from './app.reducer'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


//chart:

//import { NgChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
//import { LoginComponent } from './auth/login/login.component';  quitados cuando modularizamos.Esto va al modulo de auth
//import { RegisterComponent } from './auth/register/register.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
//import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
//import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
//import { FooterComponent } from './shared/footer/footer.component'; despues de modularizar
//import { NavbarComponent } from './shared/navbar/navbar.component';
//import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { OrdenIngresoPipe } from './pipes/orden-ingreso.pipe';

//modulos:
import { AuthModule } from './auth/auth.module';
//import { SharedModule } from './shared/shared.module';
//import { IngresoEgresoModule } from './ingreso-egreso/ingreso-egreso.module';



@NgModule({
  declarations: [
    AppComponent,
   // DashboardComponent,
    //IngresoEgresoComponent,
   // EstadisticaComponent,
   // DetalleComponent,
   // FooterComponent,
   // NavbarComponent,

    OrdenIngresoPipe,

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    //NgChartsModule,
    AuthModule,
    
    //IngresoEgresoModule lo quitamos para aplicarle el lazyload. Copiamos la ruta de donde se importa y borramos el import
    
    
    
  ],
  providers: [
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } }, //estas 3 lineas las puse buscando la solcuion de los primeros errores cuando hacia register en internet
    { provide: PERSISTENCE, useValue: 'session' },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    
    
  ],
  
  bootstrap: [AppComponent],
  
})
export class AppModule { }
