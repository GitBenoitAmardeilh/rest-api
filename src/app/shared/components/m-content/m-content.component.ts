import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IContentValue } from 'src/app/core/models/content.interface';
import { ITable } from 'src/app/core/models/table.interface';
import { tryAddContent } from 'src/app/store/actions/content.action';
import { contentModalIsLoad } from 'src/app/store/actions/modal.action';
import { contentIsLoad } from 'src/app/store/selectors/modal.selector';

@Component({
  selector: 'app-m-content',
  templateUrl: './m-content.component.html',
  styleUrls: ['./m-content.component.scss']
})
export class MContentComponent {

  @Input() public tableSelecte: ITable
  
  public contentIsLoad$: Observable<boolean> = this.store.select(contentIsLoad)

  public form: FormGroup

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      type: [''],
      keys: this.fb.array([] as IContentValue[])
    })
  }

  /**
   * 
   */
  get keys(): FormArray{
    return this.form.get('keys') as FormArray
  }

  /**
   * 
   */
  laodModalTable(){
    this.store.dispatch(contentModalIsLoad({isLoad: false}))
  }

  /**
   * 
   */
  submit(){
    let tab: IContentValue[] = this.keys.value
    let data = <{[key: string]: string}>{};
    let table = this.tableSelecte
    tab.forEach( (k) => {
      Object.assign(data, {[k.key]: k.value})
    })
    this.store.dispatch(tryAddContent({table, data}))
  }

  /**
   * 
   */
  addContent(){
    this.keys.push(
      this.fb.group({
        key: [""],
        type: [this.form.value.type],
        value: [this.getValue(this.form.value.type)]
      })
    )
  }

  /**
   * 
   * @param type 
   * @returns 
   */
  getValue(type: string): any{
    switch(type){
      case "string":
        return "Ligne";
        break;
      case "number":
        return 0;
        break;
      case "date":
        return new Date().toDateString();
        break;
      case "boolean":
        return false;
        break;
    }
    return undefined
  }

}
