import { createReducer, on } from "@ngrx/store";
import { ModalState } from "src/app/core/models/myState.interface";
import { tableModalIsLoad } from "../actions/modal.action";

export const modalKey = "modals"

const INITIAL_MODAL_STATE: ModalState = {
    tableModal: {
        isLoad: false
    }
}

export const modalReducer = createReducer(
    INITIAL_MODAL_STATE,
    on(tableModalIsLoad, (state: ModalState, action) => {
        return {
            ...state,
            tableModal: {isLoad: action.isLoad}
        }
    })
)