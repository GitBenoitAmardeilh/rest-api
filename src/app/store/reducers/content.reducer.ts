import { createReducer, on } from "@ngrx/store"
import { IContent } from "src/app/core/models/content.interface"
import { ContentState } from "src/app/core/models/myState.interface"
import { DeleteContentById, addContent, fetchContent } from "../actions/content.action"
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
            data: getArrayData(action.contents),
        }
    }),
    // on(addContent, (state: ContentState, action) => {
    //     return {
    //         ...state,
    //         data: [{
    //             idTable: action.table._id,
    //         }]
    //     }
    // }),
    on(DeleteContentById, (state: ContentState, action) => {
        return {
            ...state,
            data: state.data.filter( (d) => d._id !== action.id)
        }
    })
)

function getArrayData(data: IContent | IContent[]): IContent[]{
    return (data as IContent)['_id'] ? [data as IContent] : data as IContent[]
}