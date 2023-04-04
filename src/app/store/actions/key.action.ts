import { createAction, props } from "@ngrx/store";
import { IContent } from "src/app/core/models/content.interface";
import { ITable } from "src/app/core/models/table.interface";

export const tryfetchKey = createAction('[key] try fetch key', props<{table: ITable}>())
export const fetchKey = createAction('[key] fetch key', props<{content: IContent | IContent[], table: ITable}>())