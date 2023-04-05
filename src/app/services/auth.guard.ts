import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {

  constructor(private authService: AuthService,
              private router: Router){}
  canActivate(
    //  route: ActivatedRouteSnapshot,
    //  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //esto se lee así: un observable que resuelve un booleano, una promesa que reseulve un booleano o un simple booleano.
      //ESta es la forma en la qu etrabaja, Siempre un booleano dentro de esas opciones
    

  ): Observable<boolean> {

    return this.authService.isAuth().pipe(   //a partir de pipe le decimos que si no estamos logueados, nos envie a login
      tap(estado=>{
        if(!estado){this.router.navigate(['/login'])} //no olvidar, para usar rutas, importar el Router
      })
    );

  }

}
