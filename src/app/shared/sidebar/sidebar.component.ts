import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  ngOnInit(): void {

  

  }
  constructor(

    private authService:AuthService,
    private route: Router

  ){}

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
