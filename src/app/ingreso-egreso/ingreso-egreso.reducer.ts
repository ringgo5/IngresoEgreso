import { createReducer, on } from '@ngrx/store';
import *as actions from './ingreso-egreso.actions';
import { IngresoEgreso } from 'models/ingreso-modelo.model';
import { AppState } from '../app.reducer';

export interface State {
    items:IngresoEgreso[] 
}
export interface AppStateWithIngreso extends AppState {
    IngresoEgreso: State;
}

export const initialState: State = {
   items:[]
}

const _ingresoEgresorReducer = createReducer(initialState,

    on(actions.setItems, (state,{items}) => ({ ...state, items: [...items]})), //{items} esto indica que recibe un argumento
    on(actions.UnSetItems, state => ({ ...state, items:[]})),

);

export function ingresoEgresorReducer(state, action) {
    return _ingresoEgresorReducer(state, action);
}