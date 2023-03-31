import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { IKey } from "../models/key.interface";
import { ITable } from "../models/table.interface";

@Injectable({
    providedIn: 'root'
})
export class KeyService{
    constructor(
        private http: HttpClient
    ){}

    /**
     * 
     * @param table 
     * @returns 
     */
    get(table: ITable): Observable<IKey[]>{
        return this.http.get<IKey[]>(`https://restapi.fr/api/${table.name}`).pipe(
            tap( t => console.log({
                id_table: table._id,
                keys: []
            })),
            // map( t => (t.length) ? Object.keys(t[0]) : [])
        )
    }
}