import { createAction, props } from "@ngrx/store";

export const tableModalIsLoad = createAction('[modal table] display modal', props<{isLoad: boolean}>())
export const contentModalIsLoad = createAction('[modal content] display modal', props<{isLoad: boolean}>())