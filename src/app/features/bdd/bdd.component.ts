import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { IContent } from 'src/app/core/models/content.interface';
import { ITable } from 'src/app/core/models/table.interface';
import { tryDeleteContentById, tryFetchContent } from 'src/app/store/actions/content.action';
import { tableModalIsLoad } from 'src/app/store/actions/modal.action';
import { tryDeleteTable } from 'src/app/store/actions/table.action';
import { fetchContentSelector } from 'src/app/store/selectors/content.selector';
import { tableIsLoad } from 'src/app/store/selectors/modal.selector';
import { getIsLoad, getTables } from 'src/app/store/selectors/table.selector';

const todo = {
  name: "bob",
  title: "string",
  isLoad: false,
  comment: "all texte",
  value: 565,
  date: new Date('December 17, 1995'),
}

@Component({
  selector: 'app-bdd',
  templateUrl: './bdd.component.html',
  styleUrls: ['./bdd.component.scss']
})
export class BddComponent implements OnInit {

  public tables$: Observable<ITable[]> = this.store.select(getTables)
  public isTableModalLoad$: Observable<boolean> = this.store.select(tableIsLoad)
  public isLoad$: Observable<boolean>  = this.store.select(getIsLoad);
  public tableSelected: string

  public contents$: Observable<IContent[]> = this.store.select(fetchContentSelector)
  public isContents$: Observable<boolean> = this.store.select(fetchContentSelector).pipe(
    map(t => (t.length) ? false : true)
  )

  public keys$: Observable<any[]> = this.store.select(fetchContentSelector).pipe(
    map( t => (t[0] !== undefined) ? Object.keys(t[0]) : [])
  )

  public properties$: Observable<any[]> = this.store.select(fetchContentSelector).pipe(
    map((t) => {
      if(t[0]){
        let array: {key: string, type: string}[] = []
        Object.keys(t[0]).forEach( k => {
          array.push({
            key: k,
            type: typeof t[0][k]
          })
        })
        return array
      }
      return []
    })
  )

  public types: string[]

  constructor(
    private store: Store,
    private http: HttpClient
  ) {

    this.types = [
      'string',
      'boolean',
      'number',
      "object"
    ]

  }

  ngOnInit(): void {}

  /**
   * 
   */
  laodModalTable(){
    this.store.dispatch(tableModalIsLoad({isLoad: true}))
  }

  /**
   * 
   * @param _id 
   */
  deleteTable(_id: string | undefined){
    let id = _id as string
    this.store.dispatch(tryDeleteTable({id}))
  }

  /**
   * 
   * @param _id 
   */
  selectTable(_table: ITable | undefined){
    let table = _table as ITable
    this.tableSelected = table.name
    
    let subscription = this.isLoad$.pipe(
      combineLatestWith(this.tables$),
      map(([load, tables]) => {
        if(load && tables.length){
          console.log(load);  
          return tables
        }
        return []
      })
    )

    this.store.dispatch(tryFetchContent({table}))
  }

  /**
   * 
   * @param id 
   */
  deleteContent(ID: string){
    // let table = this.tableSelected
    // let id = ID
    // this.store.dispatch(tryDeleteContentById({table, id}))
  }

  /**
   * 
   * @param property 
   */
  getType(property: IContent){
    
    Object.keys(property).forEach( (k: string) => {
      let t = this.types.filter( t => t === typeof property[k])
      // this.properties.push({
      //   name: k,
      //   type: t[0]
      // })
    })
  }

}
