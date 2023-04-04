import { createAction, props } from "@ngrx/store";
import { IContent } from "src/app/core/models/content.interface";
import { ITable } from "src/app/core/models/table.interface";

export const tryFetchContent = createAction('[content] try fetch content', props<{table: ITable}>())
export const fetchContent = createAction('[content] fetch content', props<{contents: IContent | IContent[], table: ITable}>())

export const tryDeleteContentById = createAction('[content] try delete content by id', props<{table: string, id: string}>())
export const DeleteContentById = createAction('[content] delete content by id', props<{id: string}>())