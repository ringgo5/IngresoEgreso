import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';
//import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'ingresoEgresoApp';
  firestore: Firestore = inject(Firestore);
  items$: any;

  constructor(private AuthService : AuthService) {
    this.AuthService.initAuthListener()
    
  }
}

