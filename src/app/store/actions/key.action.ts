import { createAction, props } from "@ngrx/store";

export const tryAddKeyByTable = createAction('[key] try add key by table', props<{table: string}>())
export const addKeyByTable = createAction('[key] add key by table', props<{table: string}>())