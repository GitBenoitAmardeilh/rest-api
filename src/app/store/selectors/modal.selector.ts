import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ModalState } from "src/app/core/models/myState.interface";
import { modalKey } from "../reducers/modal.reducer";

export const selectTableFeature = createFeatureSelector<ModalState>(modalKey)

export const tableIsLoad = createSelector(selectTableFeature, (modals: ModalState) => {
    return modals.tableModal.isLoad
})