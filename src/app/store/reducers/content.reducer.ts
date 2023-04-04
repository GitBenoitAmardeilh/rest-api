import { createReducer, on } from "@ngrx/store"
import { IContent } from "src/app/core/models/content.interface"
import { ContentState } from "src/app/core/models/myState.interface"
import { DeleteContentById, fetchContent } from "../actions/content.action"
import { ITable } from "src/app/core/models/table.interface"

export const contentKey = 'contents'

const INITIAL_CONTENT_STATE: ContentState = {
    data: []
}

export const contentReducer = createReducer(
    INITIAL_CONTENT_STATE,
    on(fetchContent, (state: ContentState, action) => {
        return {
            ...state,
            data: checkData(action.contents, action.table),
        }
    }),
    on(DeleteContentById, (state: ContentState, action) => {
        return {
            ...state,
            data: state.data.filter( (d) => d._id !== action.id)
        }
    })
)

function checkData(da: IContent | IContent[], table: ITable): IContent[]{
    return (da as IContent)['_id'] ? [da as IContent] : da as IContent[]
}