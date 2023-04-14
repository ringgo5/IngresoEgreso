import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from 'models/ingreso-modelo.model';

export const UnSetItems = createAction('[ingreso-egreso] setItems');
export const setItems = createAction('[ingreso-egresot] UnSetItems'
,props<{items:IngresoEgreso[]}>()
);