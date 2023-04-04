import { createReducer, on } from "@ngrx/store";
import { IKey } from "src/app/core/models/key.interface";
import { KeyState } from "src/app/core/models/myState.interface";
import { fetchKey } from "../actions/key.action";
import { IContent } from "src/app/core/models/content.interface";

export const keyKey = "keys"

const INITIAL_KEY_STATE: KeyState = {
    data: []
}

export const keyReducer = createReducer(
    INITIAL_KEY_STATE,
    on(fetchKey, (state: KeyState, action) => {
        let content = action.content as IContent[]
        let keys: string[] = []
        let d: IKey[] = []
        if(content.length){
            Object.keys(content[0]).forEach( k => {
                keys.push(k)
            })
        }
        d.push({
            id_table: action.table._id as string,
            keys: keys
        })
        return {
            ...state,
            data: [...state.data, ...d]
        }
    })
)