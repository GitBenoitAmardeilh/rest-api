import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { ITable } from "src/app/core/models/table.interface";
import { TableService } from "src/app/core/services/table.service";
import { addTable, deleteTable, fetchTables, tryAddTable, tryDeleteTable, tryFetchTables } from "../actions/table.action";

@Injectable()
export class TableEffect{

    fetchTable$ = createEffect( () => this.action$.pipe(
        ofType(tryFetchTables),
        switchMap(() => this.sTable.get().pipe(
            map((tables: ITable[] | ITable) => fetchTables({tables}))
        ))
    ))

    addTable$ = createEffect( () => this.action$.pipe(
        ofType(tryAddTable),
        switchMap(({table}) => this.sTable.add(table).pipe(
            map( (table: ITable) => addTable({table}))
        ))
    ))

    deleteTable$ = createEffect( () => this.action$.pipe(
        ofType(tryDeleteTable),
        switchMap(({id}) => this.sTable.delete(id).pipe(
            map(() => deleteTable({id}))
        ))
    ))

    // fetchTableEffect$ = createEffect( () => this.action$.pipe(
    //     ofType(fetchTable),

    //     // Catch l'erreur avec le pipe()
    //     switchMap(() => this.tableService.fetch().pipe(

    //         map( (tables: ITable[]) => fetchTableSuccess({tables})),

    //         //utilisation de of() car catchError retourne un nouvel Observable
    //         catchError( (error) => of(errorTable({error})))
    //     ))
    // ))

    constructor(
        private action$: Actions,
        private sTable: TableService
    ){}

}