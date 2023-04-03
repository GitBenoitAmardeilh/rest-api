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
        let array = action.tables as ITable[]
        let obj = action.tables as ITable
        let tables: ITable[] = []

        if(obj['_id'])
            tables.push(obj)
        else 
            tables = array

        return {
            ...state,
            data: tables,
            // data: (action.tables.length === undefined) ? [] : [...action.tables as ITable[]],
            // data: (action.tables.length === 0) ? [] : [...action.tables as ITable[]],
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