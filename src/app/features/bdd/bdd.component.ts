import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { IContent } from 'src/app/core/models/content.interface';
import { ITable } from 'src/app/core/models/table.interface';
import { tryDeleteContentById, tryFetchContent } from 'src/app/store/actions/content.action';
import { tableModalIsLoad } from 'src/app/store/actions/modal.action';
import { tryDeleteTable } from 'src/app/store/actions/table.action';
import { fetchContentSelector } from 'src/app/store/selectors/content.selector';
import { tableIsLoad } from 'src/app/store/selectors/modal.selector';
import { getTables } from 'src/app/store/selectors/table.selector';

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

  public tableIsLoad$: Observable<boolean> = this.store.select(tableIsLoad)
  public tables$: Observable<ITable[]> = this.store.select(getTables)
  public tableSelected: string
  public tableLength: number

  public contents$: Observable<IContent[]> = this.store.select(fetchContentSelector)
  public contentLength: number
  // public contentSelected: IContent
  public properties: {name: string, type: string}[]
  public keys$: Observable<string[]>

  public types: string[]

  constructor(
    private store: Store,
    private http: HttpClient
  ) {

    this.types = [
      "string",
      "boolean",
      "number",
      "date"
    ]

    this.keys$ = this.contents$.pipe(
      map( (k) => (k.length !== 0) ? Object.keys(k[0]) : [])
    )

    this.contents$.subscribe( c => {
      this.contentLength = c.length
      this.properties = []
      if(c[0] !== undefined)
        this.getType(c[0])
    })

    this.tables$.subscribe( t => {
      this.tableLength = t.length
    })

    // this.http.post('https://restapi.fr/api/user', todo).subscribe()

    // this.http.delete('https://restapi.fr/api/user/642373fbe2f79965f068fcbd').subscribe(() => {

    // })

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
  selectTable(_name: string | undefined){
    let name = this.tableSelected = _name as string
    
    // let subscription = this.isLoad$.pipe(
    //   combineLatestWith(this.tables$),
    //   map(([load, tables]) => {
    //     if(load && tables.length){
    //       console.log(load);  
    //       return tables
    //     }
    //     return []
    //   })
    // )
    
    // subscription.forEach( t => {
    //   console.log(t)
    // })

    // this.store.dispatch(tryFetchContent({name}))
  }

  /**
   * 
   * @param id 
   */
  deleteContent(ID: string){
    let table = this.tableSelected
    let id = ID
    this.store.dispatch(tryDeleteContentById({table, id}))
  }

  /**
   * 
   * @param property 
   */
  getType(property: IContent){
    
    Object.keys(property).forEach( (k: string) => {
      let t = this.types.filter( t => t === typeof property[k])
      this.properties.push({
        name: k,
        type: t[0]
      })
    })
  }

}
