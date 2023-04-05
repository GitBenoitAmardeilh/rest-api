import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { IContent } from 'src/app/core/models/content.interface';
import { fetchContentSelector } from 'src/app/store/selectors/content.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public contents$: Observable<IContent[]> = this.store.select(fetchContentSelector)
  public contentLength: number 

  constructor(
    private store: Store
  ) {
    this.contents$.subscribe( c => {
      this.contentLength = c.length
    })
   }

  ngOnInit(): void {
  }

  addContent(event: any){
    if(event.target.parentNode.className !== "dontAdd"){
      console.log("ok to add")
    }
  }

}
