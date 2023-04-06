import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';


export interface AppState {
   ui:ui.State  //ui porque lo hemos puesto as ui
   user:auth.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user:auth.AuthReducer
}