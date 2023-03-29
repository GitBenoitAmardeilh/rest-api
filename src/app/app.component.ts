import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, combineLatestWith, map, Observable, tap } from 'rxjs';
import { ITable } from './core/models/table.interface';
import { tryFetchTables } from './store/actions/table.action';
import { getIsLoad, getTables } from './store/selectors/table.selector';
// import { changeIsLoad } from './store/actions/table.action';
// import { isLoadValue } from './store/selectors/table.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'store';

  // public tables$: Observable<ITable[]> = this.store.select(getTables)
  // public isLoad$: Observable<boolean>  = this.store.select(getIsLoad);
  // public isLoad: boolean

  constructor(
    private store: Store
  ){
    this.init()
  }

  init(){
    this.store.dispatch(tryFetchTables())
  }

  // combine(): Observable<any>{
  //   return this.isLoad$.pipe(
  //     combineLatestWith(this.tables$),
  //     map(([load, tables]) => {
  //       if(load && tables.length){
  //         console.log(load);  
  //         return tables
  //       }
  //       return []
  //     })
  //   )
  // }

}
