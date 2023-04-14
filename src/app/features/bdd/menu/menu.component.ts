import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IContent } from 'src/app/core/models/content.interface';
import { ITable } from 'src/app/core/models/table.interface';
import { tryDeleteContentById } from 'src/app/store/actions/content.action';
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
  public contents: IContent[]
  public contentLength: number;

  @Input() public tableSelecte: ITable
  @Input() public idContent: number

  constructor(
    private store: Store
  ) {
    this.idContent = 0
    this.contents = []
    this.contents$.subscribe( contents => {
      this.contentLength = contents.length;
      this.contents = contents
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

  /**
   * 
   */
  deleteContent(){
    let id: string = ""
    this.contents.forEach( (content, index) => {
      if(index === this.idContent)
        id = content._id as string
    })
    this.store.dispatch(tryDeleteContentById({table: this.tableSelecte, id}))
  }

}
