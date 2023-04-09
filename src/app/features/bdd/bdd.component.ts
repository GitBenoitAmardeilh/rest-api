import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-bdd',
  templateUrl: './bdd.component.html',
  styleUrls: ['./bdd.component.scss']
})
export class BddComponent{

  @Input() public idContentSelected: number

  public tables$: Observable<ITable[]> = this.store.select(getTables)
  public isTableModalLoad$: Observable<boolean> = this.store.select(tableIsLoad)
  public isLoad$: Observable<boolean>  = this.store.select(getIsLoad);
  public tableSelected: ITable

  public contents$: Observable<IContent[]> = this.store.select(fetchContentSelector)
  public isContents$: Observable<boolean> = this.store.select(fetchContentSelector).pipe(
    map(t => (t.length) ? false : true)
  )

  constructor(
    private store: Store
  ) {}

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
    this.tableSelected = table
    this.store.dispatch(tryFetchContent({table}))
  }

  setIDContentSelected(id: number){
    this.idContentSelected = id
  }

}
