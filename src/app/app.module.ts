import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//modulos:
import { AppRoutingModule } from './app-routing.module';

//formularioReactivo:

import {ReactiveFormsModule} from '@angular/forms';
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

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AngularFireModule.initializeApp(environment.firebase)
    
    
    
  ],
  providers: [
    { provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } }, //estas 3 lineas las puse buscando la solcuion de los primeros errores cuando hacia register en internet
    { provide: PERSISTENCE, useValue: 'session' },
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    
    
  ],
  
  bootstrap: [AppComponent],
  
})
export class AppModule { }
