import { Component, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IContent } from 'src/app/core/models/content.interface';
import { fetchContentSelector, lengthContentSelector } from 'src/app/store/selectors/content.selector';
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent{

  @Output() private event: EventEmitter<number> = new EventEmitter()

  public format: string
  
  public lengthContent$: Observable<number> = this.store.select(lengthContentSelector)
  public contents$: Observable<IContent[]> = this.store.select(fetchContentSelector)
  public isContents$: Observable<boolean> = this.store.select(fetchContentSelector).pipe(
    map(t => (t.length) ? false : true)
  )

  public keys$: Observable<any[]> = this.store.select(fetchContentSelector).pipe(
    map( t => (t[0] !== undefined) ? Object.keys(t[0]) : [])
  )

  public properties$: Observable<{key: string, type: string}[]> = this.store.select(fetchContentSelector).pipe(
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

  constructor(
    private store: Store
  ) {
    this.format = "table"

   }

   /**
    * 
    * @param e 
    * @param id 
    */
   checkbox(e: Event){
    let id: number = parseInt((e.target as HTMLElement).getAttribute('id') as string)
    this.event.emit(id)
   }

}
