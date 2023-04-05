import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IContent } from 'src/app/core/models/content.interface';
import { fetchContentSelector } from 'src/app/store/selectors/content.selector';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public format: string
  
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

  ngOnInit(): void {
  }

}
