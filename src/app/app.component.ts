import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IContent } from './core/models/content.interface';
import { ITable } from './core/models/table.interface';
import { tryFetchTables } from './store/actions/table.action';
import { fetchContentSelector } from './store/selectors/content.selector';
import { getIsLoad, getTables } from './store/selectors/table.selector';

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

  constructor(
    private store: Store
  ){
    // this.isLoad$.pipe(
    //   combineLatestWith(this.tables$),
    //   map(([isLoad, tables]) => {
    //     return [isLoad, tables]
    //   })
    // ).subscribe((data) => {
    //   if(data[0] === true && (data[1] as ITable[]).length)
    //     this.checkTableContent(data[1] as ITable[])
    // })
  }

  ngOnInit(): void {
    this.store.dispatch(tryFetchTables())
  }

  // checkTableContent(tables: ITable[]){
  //   tables.forEach( table => {
  //     this.store.dispatch(tryfetchKey({table}))
  //   })
  // }

}
