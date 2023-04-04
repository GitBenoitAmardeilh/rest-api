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
            data: checkData(action.tables),
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

function checkData(data: ITable | ITable[]): ITable[]{
    return (data as ITable)['_id'] ? [data as ITable] : data as ITable[]
}
