import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs";
import { IKey } from "src/app/core/models/key.interface";
import { KeyService } from "src/app/core/services/key.service";
import { fetchKey, tryfetchKey } from "../actions/key.action";
import { IContent } from "src/app/core/models/content.interface";

@Injectable()
export class KeyEffect{

    fetchKey$ = createEffect(() => this.action$.pipe(
        ofType(tryfetchKey),
        mergeMap(({table}) => this.sKey.get(table).pipe(
            map((content: IContent | IContent[]) => fetchKey({content, table}))
        ))
    ))

    constructor(
        private action$: Actions,
        private sKey: KeyService
    ){}
}