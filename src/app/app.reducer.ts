import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
   ui:ui.State  //ui porque lo hemos puesto as ui
   user:auth.State
  // ingresoEgreso:ingresoEgreso.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user:auth.AuthReducer,
   //ingresoEgreso:ingresoEgreso.ingresoEgresorReducer
}