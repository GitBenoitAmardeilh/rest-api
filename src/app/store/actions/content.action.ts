import { createAction, props } from "@ngrx/store";
import { IContent } from "src/app/core/models/content.interface";

export const fetchContent = createAction('[content] fetch content', props<{contents: IContent | IContent[]}>())
export const tryFetchContent = createAction('[content] try fetch content', props<{name: string}>())

export const tryDeleteContentById = createAction('[content] try delete content by id', props<{table: string, id: string}>())
export const DeleteContentById = createAction('[content] delete content by id', props<{id: string}>())