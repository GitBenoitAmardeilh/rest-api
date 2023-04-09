import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IKey } from "../models/key.interface";
import { ITable } from "../models/table.interface";
import { restAPIConfig } from "../config/restapi.config";
import { IContent } from "../models/content.interface";

@Injectable({
    providedIn: 'root'
})
export class KeyService{
    constructor(
        private http: HttpClient
    ){}
    
    /**
     * 
     * @returns 
     */
    add(key: IKey): Observable<IKey>{
        return this.http.post<IKey>(`https://restapi.fr/api/${restAPIConfig.key}`, key)
    }

    /**
     * 
     * @param table 
     * @returns 
     */
    check(table: ITable): Observable<IContent | IContent[]>{
        return this.http.get<IContent | IContent[]>(`https://restapi.fr/api/${table.name}`)
    }
}