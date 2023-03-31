import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { map, mergeMap, switchMap } from "rxjs";
import { IKey } from "src/app/core/models/key.interface";
import { KeyService } from "src/app/core/services/key.service";
import { addKey, tryAddKey } from "../actions/key.action";

@Injectable()
export class KeyEffect{

    addKey$ = createEffect(() => this.action$.pipe(
        ofType(tryAddKey),
        mergeMap(({table}) => this.sKey.get(table).pipe(
            map((keys: IKey[]) => addKey({keys}))
        ))
    ))

    constructor(
        private action$: Actions,
        private sKey: KeyService
    ){}
}