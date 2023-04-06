import { createReducer, on } from '@ngrx/store';
import { isLoading,stopLoading } from './ui.actions';

export interface State {
    isloading: boolean; 
}

export const initialState: State = {
   isloading:false,
}

const _uiReducer = createReducer(initialState,

    on(isLoading, state => ({ ...state, isloading: true})),
    on(stopLoading, state => ({ ...state, isloading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}