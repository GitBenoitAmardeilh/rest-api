import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IContent } from "../models/content.interface";

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
    get(name: string): Observable<IContent[]>{
        return this.http.get<IContent[]>(`https://restapi.fr/api/${name}`)
    }

    /**
     * 
     * @param table 
     * @param id 
     * @returns 
     */
    delete(table: string, id: string): Observable<any>{
        return this.http.delete<any>(`https://restapi.fr/api/${table}/${id}`)
    }

}