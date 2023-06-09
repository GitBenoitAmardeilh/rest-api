import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap, switchMap, tap } from "rxjs";
import { IContent } from "src/app/core/models/content.interface";
import { ContentService } from "src/app/core/services/content.service";
import { DeleteContentById, addContent, fetchContent, tryAddContent, tryDeleteContentById, tryFetchContent } from "../actions/content.action";

@Injectable()
export class ContentEffect{

    fetchContent$ = createEffect( () => this.action$.pipe(
        ofType(tryFetchContent),
        mergeMap( ({table}) => this.sContent.get(table).pipe(
            map( (contents: IContent[]) => fetchContent({contents, table}))
        ))
    ))

    addContent$ = createEffect( () => this.action$.pipe(
        ofType(tryAddContent),
        switchMap(({table, data}) => this.sContent.add(table, data).pipe(
            map(({table, data}) => addContent({table, data}))
        ))
    ))

    deleteByID$ = createEffect( () => this.action$.pipe(
        ofType(tryDeleteContentById),
        switchMap( ({table, id}) => this.sContent.delete(table, id).pipe(
            map( () => DeleteContentById({id}))
        ))
    ))
    
    constructor(
        private action$: Actions,
        private sContent: ContentService
    ){}
}