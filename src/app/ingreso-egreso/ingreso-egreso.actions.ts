import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from 'models/ingreso-modelo.model';

export const UnSetItems = createAction('[ingreso-egreso] UnsetItems');
export const setItems = createAction(
    '[ingresoEgreso] SetItems'
,props<{items:IngresoEgreso[]}>()
);