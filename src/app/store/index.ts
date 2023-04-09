import { ActionReducerMap } from "@ngrx/store";
import { Action } from "@ngrx/store";
import { MyState } from "../core/models/myState.interface";
import { contentKey, contentReducer } from "./reducers/content.reducer";
import { modalKey, modalReducer } from "./reducers/modal.reducer";
import { tableKey, dataReducer } from "./reducers/table.reducer";

export const ROOT_REDUCERS: ActionReducerMap<MyState, Action> = {
    [tableKey]: dataReducer,
    [modalKey]: modalReducer,
    [contentKey]: contentReducer
}