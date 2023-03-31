import { createAction, props } from "@ngrx/store";
import { IKey } from "src/app/core/models/key.interface";
import { ITable } from "src/app/core/models/table.interface";

export const tryAddKey = createAction('[key] try add key', props<{table: ITable}>())
export const addKey = createAction('[key] add key', props<{keys: IKey[]}>())