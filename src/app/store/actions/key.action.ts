import { createAction, props } from "@ngrx/store";

export const addKeyByTable = createAction('[key] add key by table', props<{table: string}>())