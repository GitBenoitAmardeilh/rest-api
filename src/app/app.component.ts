import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatestWith, map } from 'rxjs';
import { IContent } from './core/models/content.interface';
import { ITable } from './core/models/table.interface';
import { KeyService } from './core/services/key.service';
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

  private subscription: Subscription = new Subscription()

  constructor(
    private store: Store,
    private sKey: KeyService
  ){
    this.isLoad$.pipe(
      combineLatestWith(this.tables$),
      map(([isLoad, tables]) => {
        return [isLoad, tables]
      })
    ).subscribe((data) => {
      // console.log(data)
    })
  }

  ngOnInit(): void {
    this.store.dispatch(tryFetchTables())
  }

  checkTableContent(){

  }

}
