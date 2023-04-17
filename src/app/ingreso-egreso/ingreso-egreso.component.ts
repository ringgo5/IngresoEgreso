import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from 'models/ingreso-modelo.model';
import * as actions from '../shared/ui.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit,OnDestroy{

  ingresoForm: FormGroup
  tipo:string='ingreso';
  loading:boolean=false;
  loadingSubs:Subscription;


  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store : Store<AppState>
    
  ){}
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }



  ngOnInit() {
    this.loadingSubs=this.store.select('ui')
    .subscribe(ui=>{this.loading=ui.isloading})

    this.ingresoForm=this.fb.group({
       descripcion:['',Validators.required],
       numero:['',Validators.required],
       //tipo:['',Validators.required],

    });
    
  }

  guardar(){
    this.store.dispatch(actions.isLoading());
      if(this.ingresoForm.invalid){return;}
     
    console.log(this.ingresoForm.value)
    console.log(this.tipo)
    
    const {descripcion,numero}=this.ingresoForm.value;
    const ingresoEgreso = new IngresoEgreso(descripcion,numero,this.tipo)


    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    this.ingresoForm.reset;
    this.store.dispatch(actions.stopLoading());
    Swal.fire('registro añadido',descripcion, 'success')
  }

}
