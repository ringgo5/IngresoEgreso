import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { Usuario } from 'models/usuario.model';

export interface State {
    user: Usuario; 
}

export const initialState: State = {
   user:null  //ponemos que el usuariio esta null de principio,por ejemplo
}

const _AuthReducer = createReducer(initialState,

    on(actions.setUser, (state, {user}) => ({ ...state, user:{...user}})), //...user indica que voy a coger todas las propiedades de user y las voy a extraer
    on(actions.unSetuUser, state => ({ ...state, user:null})),            //mejor usar desestructuracion
    //aconsejable dejar el ...state, ya que si en el futuro añadimos algo, siempre va valer,ya que indica que cogemos todas las propiedad del state
);

export function AuthReducer(state, action) {
    return _AuthReducer(state, action);
}