import { createReducer, on } from "@ngrx/store";
import { IKey } from "src/app/core/models/key.interface";
import { KeyState } from "src/app/core/models/myState.interface";
import { addKey } from "../actions/key.action";

export const keyKey = "keys"

const INITIAL_KEY_STATE: KeyState = {
    data: []
}

export const keyReducer = createReducer(
    INITIAL_KEY_STATE,
    on(addKey, (state: KeyState, action) => {
        console.log(action)
        return {
            ...state,
            data: []
        }
    })
)