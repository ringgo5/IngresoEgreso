import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos:
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
    
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
