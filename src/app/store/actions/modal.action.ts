import { createAction, props } from "@ngrx/store";

export const tableModalIsLoad = createAction('[modal] display modal', props<{isLoad: boolean}>())