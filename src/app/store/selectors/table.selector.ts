import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TableState } from "src/app/core/models/myState.interface";
import { tableKey } from "../reducers/table.reducer";

export const selectTableFeature = createFeatureSelector<TableState>(tableKey)

export const getTables = createSelector(selectTableFeature, (tables: TableState) => {
    return tables.data
})

export const getIsLoad = createSelector(selectTableFeature, (tables: TableState) => {
    return tables.isLoad
})