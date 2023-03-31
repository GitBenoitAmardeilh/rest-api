import { createReducer, on } from "@ngrx/store";
import { TableState } from "src/app/core/models/myState.interface";
import { ITable } from "src/app/core/models/table.interface";
import { addTable, deleteTable, fetchTables } from "../actions/table.action";

export const tableKey = "tables"

// export const MySTATE
const INITIAL_DATA_STATE: TableState = {
    data: [],
    isLoad: false
}

export const dataReducer = createReducer(
    INITIAL_DATA_STATE,
    on(fetchTables, (state: TableState, action): TableState => {
        return {
            ...state,
            data: (action.tables.length === 0) ? [] : [...action.tables as ITable[]],
            // data: (Object.keys(action.tables)[0] === "0") ? [...state.data, ...action.tables as ITable[]] : [action.tables as ITable],
            isLoad: true
        }
    }),
    on(addTable, (state: TableState, action): TableState => {
        return {
            ...state,
            data: [...state.data, action.table]
        }
    }),
    on(deleteTable, (state: TableState, action): TableState => {
        return {
            ...state,
            data: state.data.filter( (v) => v._id !== action.id)
        }
    })
)