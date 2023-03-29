import { createReducer } from "@ngrx/store";
import { IKey } from "src/app/core/models/key.interface";
import { KeyState } from "src/app/core/models/myState.interface";

export const keyKey = "keys"

const INITIAL_KEY_STATE: KeyState = {
    data: []
}

export const keyReducer = createReducer(
    INITIAL_KEY_STATE
)