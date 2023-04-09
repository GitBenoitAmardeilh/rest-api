import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IContent } from "src/app/core/models/content.interface";
import { ContentState } from "src/app/core/models/myState.interface";
import { contentKey } from "../reducers/content.reducer";

export const selectContentFeature = createFeatureSelector<ContentState>(contentKey)

export const fetchContentSelector = createSelector(selectContentFeature, (contents: ContentState) => {
    return contents.data
})

export const lengthContentSelector = createSelector(selectContentFeature, (contents: ContentState) => {
    return contents.data.length
})