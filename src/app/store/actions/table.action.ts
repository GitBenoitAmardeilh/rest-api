import { createAction, props } from "@ngrx/store";
import { ITable } from "src/app/core/models/table.interface";

export const tryFetchTables = createAction('[table] try fetch table')
export const fetchTables = createAction('[table] fetch table', props<{tables: ITable[] | ITable}>())

export const tryAddTable = createAction('[table] try add table', props<{table: ITable}>())
export const addTable = createAction('[table] add table', props<{table: ITable}>())

export const tryDeleteTable = createAction('[table] try delete table', props<{id: string}>())
export const deleteTable = createAction('[table] delete table', props<{id: string}>())