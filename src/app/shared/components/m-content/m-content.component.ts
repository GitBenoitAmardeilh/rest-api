import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IContent, IContentValue } from 'src/app/core/models/content.interface';
import { ITable } from 'src/app/core/models/table.interface';
import { tryAddContent, fetchContent } from 'src/app/store/actions/content.action';
import { contentModalIsLoad } from 'src/app/store/actions/modal.action';
import { contentIsLoad } from 'src/app/store/selectors/modal.selector';

/**
 * VALEURS ALEATOIRES POUR :
 * 
 * --STRING--[
 *    - Texte aléatoire
 *    - Texte saisie
 *    - Liste de textes ['val1', 'val2', ...] 
 * ]
 * 
 * --BOOLEAN--[
 *    - Valeur aléatoire ('true' OU 'false')
 *    - Valeur saisie (tout à 'true' OU tout à 'false')
 * ]
 * 
 * --NUMBER--[
 *    - Valeur aléatoire
 *    - Valeur saisie (La même valeur pour chaque entrée)
 * ]
 * 
 * --DATE--[
 *    - date du jour pour le moment
 * ]
 */

@Component({
  selector: 'app-m-content',
  templateUrl: './m-content.component.html',
  styleUrls: ['./m-content.component.scss']
})
export class MContentComponent {

  @Input() public tableSelecte: ITable
  
  public contentIsLoad$: Observable<boolean> = this.store.select(contentIsLoad);

  public form: FormGroup;

  constructor(
    private store: Store,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      type: [''],
      seed: 1,
      checkbox: [false, Validators.requiredTrue],
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
    let tab: IContentValue[] = this.keys.value;
    let table = this.tableSelecte
    let data: IContent[] = []
    let i: number = 0

    while(i < this.form.value.seed){
      let array = <{[key: string]: string}>{};
      tab.forEach( (k) => {
        let cont: string | number | boolean = ""
        if(k.option === 'random')
          cont = this.returnRandomValue(k)
        else
          cont = k.content

        Object.assign(array, {[k.key]: cont})
      })
      data.push(array)
      i++
    }

    let contents: IContent[] = data

    this.store.dispatch(tryAddContent({table, data}))
    // this.store.dispatch(fetchContent({contents, table}))
    this.store.dispatch(contentModalIsLoad({isLoad: false}))
  }

  /**
   * 
   */
  returnRandomValue(content: IContentValue): string | number | boolean{
    
    let data: string | number | boolean
    switch(content.type){
      case "string":
        data = "random text"
        break;
      case "number":
        data = Math.floor(Math.random() * 100)
        break;
      case "boolean":
        data = (Math.floor(Math.random() * 2) === 1) ? true : false
        break;
      default:
        data = ""
        break;
    }
    return data
  }

  /**
   * 
   */
  addContent(){
    if(this.form.value.type.length !== 0){
      this.keys.push(
        this.fb.group({
          key: [""],
          type: [this.form.value.type],
          option: "random",
          content: ""
        })
      )
    }
  }

}
