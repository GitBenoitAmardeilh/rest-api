import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, combineLatestWith, map, Observable, Subscription, tap } from 'rxjs';
import { IContent } from './core/models/content.interface';
import { ITable } from './core/models/table.interface';
import { tryFetchContent } from './store/actions/content.action';
import { tryFetchTables } from './store/actions/table.action';
import { fetchContentSelector } from './store/selectors/content.selector';
import { getIsLoad, getTables } from './store/selectors/table.selector';
// import { changeIsLoad } from './store/actions/table.action';
// import { isLoadValue } from './store/selectors/table.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'store';

  public tables$: Observable<ITable[]> = this.store.select(getTables)
  public isLoad$: Observable<boolean>  = this.store.select(getIsLoad);

  public content$: Observable<IContent[]> = this.store.select(fetchContentSelector)

  private subscription: Subscription = new Subscription()

  constructor(
    private store: Store
  ){

    let sub = this.content$.pipe(
      combineLatestWith(this.tables$),
      map( ([contents, tables]: [IContent[], ITable[]]) => {
        return [contents, tables]
        // return [...contents, ...tables]
      })
    )

    this.subscription.add(sub.subscribe( data => {
      console.log(data[1])
    }))

    // this.isLoad$.pipe(
    //   combineLatestWith(this.tables$),
    //   map( ([load, tables]) => {
    //     if(load && tables.length){
    //       tables.forEach( (table) => {
    //           let name = table.name
    //           console.log("dispatch")
    //           this.store.dispatch(tryFetchContent({name}))
              
    //       })
    //     }
    //   })
    // ).subscribe()

    // this.content$.pipe(
    //   combineLatestWith(this.tables$),
    //   map( ([contents, tables]) => {
    //     return [contents, tables]
    //   })
    // ).subscribe( data => {
    //   console.log(data)
    // })

  }

  ngOnInit(): void {
    this.store.dispatch(tryFetchTables())
  }

}
