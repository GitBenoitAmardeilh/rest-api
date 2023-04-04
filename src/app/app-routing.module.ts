import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BddComponent } from './features/bdd/bdd.component';
import { ParametersComponent } from './features/parameters/parameters.component';

const routes: Routes = [
  {path: '', component: BddComponent},
  {path: 'params', component: ParametersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
