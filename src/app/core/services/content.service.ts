import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IContent } from "../models/content.interface";
import { ITable } from "../models/table.interface";

@Injectable({
    providedIn: 'root'
})
export class ContentService{

    constructor(
        private http: HttpClient
    ){}

    /**
     * 
     * @param table 
     * @returns 
     */
    get(table: ITable): Observable<IContent[]>{
        return this.http.get<IContent[]>(`https://restapi.fr/api/${table.name}`)
    }

    /**
     * 
     * @param table 
     * @param data 
     * @returns 
     */
    add(table: ITable, data: {[key: string]: string}){
        console.log('data : ', data)
        console.log('table : ', table)
        return this.http.post(`https://restapi.fr/api/${table.name}`, data)
    }

    /**
     * 
     * @param table 
     * @param id 
     * @returns 
     */
    delete(table: ITable, id: string): Observable<any>{
        return this.http.delete<any>(`https://restapi.fr/api/${table.name}/${id}`)
    }

}