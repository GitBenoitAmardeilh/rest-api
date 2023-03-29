import { createReducer, on } from "@ngrx/store"
import { IContent } from "src/app/core/models/content.interface"
import { ContentState } from "src/app/core/models/myState.interface"
import { DeleteContentById, fetchContent } from "../actions/content.action"

export const contentKey = 'contents'

const INITIAL_CONTENT_STATE: ContentState = {
    data: []
}

export const contentReducer = createReducer(
    INITIAL_CONTENT_STATE,
    on(fetchContent, (state: ContentState, action) => {
        return {
            ...state,
            data: (action.contents.length === 0) ? [] : [...action.contents as IContent[]]
            // data: (Object.keys(action.contents)[0] === "0") ? [...action.contents as IContent[]] : [action.contents as IContent]
        }
    }),
    on(DeleteContentById, (state: ContentState, action) => {
        return {
            ...state,
            data: state.data.filter( (d) => d._id !== action.id)
            // data: state.data.filter( d => (d))
        }
    })
)