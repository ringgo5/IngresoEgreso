import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'models/ingreso-modelo.model';
import * as actions from '../../shared/ui.actions';

//chart:
import { ChartData, ChartEvent, ChartType } from 'chart.js';

import { AppState } from 'src/app/app.reducer';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit,OnDestroy{

  ingresos:number = 0;
  egresos:number=0;
  totalIngresos:number=0;
  totalEgresos:number=0;
  loading:boolean=false;
  public doughnutChartLabels: string[] = [ 'ingresos', 'egresos' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: []},
        
      
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
  totalingresos: number;

  constructor(private store: Store<AppStateWithIngreso>){

    
  }
  
  
  ngOnInit(): void {

    this.store?.select('ingresosEgresos')
    .subscribe(({items})=>{
      this.generarEstadistica(items)
    })
    
  }
  ngOnDestroy(): void {
    
  }

  generarEstadistica(items:IngresoEgreso[]){
    
    //console.log(items)
    //this.doughnutChartData=[[this.totalIngresos,this.totalEgresos]]

    this.ingresos= 0;
    this.egresos=0;
    this.totalIngresos=0;
    this.totalEgresos=0;
    for (const item of items) {
      if(item.tipo==='ingreso'){
        this.totalIngresos+=item.numero
        this.ingresos ++;
      }
      else{
        this.totalEgresos+=item.numero
        this.egresos ++;
      }
      
    }/*
    this.doughnutChartData={
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.totalEgresos,this.totalIngresos]
        }
      ]
    };*/
    this.doughnutChartData.datasets=[{
      data:[this.totalIngresos,this.totalEgresos]
  }]
    

    
  }
  
  
  
  

}
