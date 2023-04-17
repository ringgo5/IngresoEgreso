import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, filter } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,OnDestroy{

  subscripcion:Subscription;
  usuario:string='';

  
  constructor(

    private authService:AuthService,
    private route: Router,
    private store:Store<AppState>

  ){}
  ngOnDestroy(): void {
    this.subscripcion.unsubscribe()
  }
  ngOnInit(): void {

    this.subscripcion= this.store.select('user')
    .pipe(
      filter(({user})=>user !=null)
    )
    .subscribe(({user})=>{
      //console.log(algo.user.nombre)
      this.usuario=user?.nombre
    
    })
    
  
    }

  cerrarSesion(){
    Swal.fire({
      title: 'Saliendo de tu cuenta',
      didOpen: ()=>{
        Swal.showLoading();
       
      }
    })
      this.authService.logOut()
      .then(()=>{
        this.route.navigate(["/login"])
        Swal.close();
      })
  }

}
