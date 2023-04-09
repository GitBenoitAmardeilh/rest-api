import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { ROOT_REDUCERS } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { BddComponent } from './features/bdd/bdd.component';
import { ParametersComponent } from './features/parameters/parameters.component';
import { MTableComponent } from './shared/components/m-table/m-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http'
import { TableEffect } from './store/effects/table.effect';
import { ContentEffect } from './store/effects/content.effect';
import { ShowMenuDirective } from './shared/directives/sub-menu.directive';
import { MenuComponent } from './features/bdd/menu/menu.component';
import { ContentComponent } from './features/bdd/content/content.component';
import { MContentComponent } from './shared/components/m-content/m-content.component';

@NgModule({
  declarations: [
    AppComponent,
    BddComponent,
    ParametersComponent,
    MTableComponent,

    ShowMenuDirective,
      MenuComponent,
      ContentComponent,
      MContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([TableEffect, ContentEffect]),
    StoreModule.forRoot(ROOT_REDUCERS, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
