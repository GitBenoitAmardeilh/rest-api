import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITable } from 'src/app/core/models/table.interface';
import { tableModalIsLoad } from 'src/app/store/actions/modal.action';
import { tryAddTable } from 'src/app/store/actions/table.action';
import { tableIsLoad } from 'src/app/store/selectors/modal.selector';

@Component({
  selector: 'app-m-table',
  templateUrl: './m-table.component.html',
  styleUrls: ['./m-table.component.scss']
})
export class MTableComponent implements OnInit {

  public tableIsLoad$: Observable<boolean> = this.store.select(tableIsLoad)

  public form: FormGroup = new FormGroup({
    name: new FormControl('')
  })

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
  }

  laodModalTable(){
    this.store.dispatch(tableModalIsLoad({isLoad: false}))
  }

  addTable(){
    if(this.form.value.name){
      let table: ITable = {
        name: this.form.value
      }
      this.store.dispatch(tryAddTable({table}))
      this.laodModalTable()
    }
  }

}
