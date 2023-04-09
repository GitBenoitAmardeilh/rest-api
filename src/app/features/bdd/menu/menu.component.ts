import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IContent } from 'src/app/core/models/content.interface';
import { ITable } from 'src/app/core/models/table.interface';
import { contentModalIsLoad } from 'src/app/store/actions/modal.action';
import { fetchContentSelector } from 'src/app/store/selectors/content.selector';
import { contentIsLoad } from 'src/app/store/selectors/modal.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent{

  public contentIsLoad$: Observable<boolean> = this.store.select(contentIsLoad)
  public contents$: Observable<IContent[]> = this.store.select(fetchContentSelector);
  public contentLength: number;

  @Input() public tableSelecte: ITable
  @Input() public idContent: number

  public deleteContent: boolean;

  constructor(
    private store: Store
  ) {
    this.contents$.subscribe( c => {
      this.contentLength = c.length;
      this.deleteContent = false;
    })
   }

  /**
   * 
   * @param event 
   */
  addContent(event: any){
    if(event.target.parentNode.className === "enabled"){
      this.store.dispatch(contentModalIsLoad({isLoad: true}))
    }
  }

}
