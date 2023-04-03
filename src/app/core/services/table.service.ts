import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { restAPIConfig } from "../config/restapi.config";
import { ITable } from "../models/table.interface";

@Injectable({
    providedIn: 'root'
})
export class TableService{
    constructor(
        private http: HttpClient
    ){}

    /**
     * 
     * @param table 
     * @returns 
     */
    add(table: ITable): Observable<ITable>{
        console.log("launch service");
        return this.http.post<ITable>(`https://restapi.fr/api/${restAPIConfig.table}`, table.name)
    }

    /**
     * 
     * @returns 
     */
    get(): Observable<ITable | ITable[]>{
        return this.http.get<ITable | ITable[]>(`https://restapi.fr/api/${restAPIConfig.table}`)
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    delete(id: string){
        return this.http.delete(`https://restapi.fr/api/${restAPIConfig.table}/${id}`)
    }
}