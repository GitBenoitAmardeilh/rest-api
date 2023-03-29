import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";
import { IContent } from "src/app/core/models/content.interface";
import { ContentService } from "src/app/core/services/content.service";
import { DeleteContentById, fetchContent, tryDeleteContentById, tryFetchContent } from "../actions/content.action";

@Injectable()
export class ContentEffect{

    fetchContent$ = createEffect( () => this.action$.pipe(
        ofType(tryFetchContent),
        switchMap( ({name}) => this.sContent.get(name).pipe(
            map( (contents: IContent[]) => fetchContent({contents}))
        ))
    ))

    deleteByID = createEffect( () => this.action$.pipe(
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