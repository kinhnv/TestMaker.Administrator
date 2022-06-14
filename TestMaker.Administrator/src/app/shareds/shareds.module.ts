import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent, FormControlComponent, LayoutComponent, TableComponent } from './components';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialExampleModule } from '../material.module';
import { httpInterceptorProviders } from './interceptors';
import { TestsService, CandidatesService, EventsService, QuestionsService } from './services';

@NgModule({
  declarations: [
    LayoutComponent,
    FormControlComponent,
    FormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialExampleModule
  ],
  exports: [
    LayoutComponent,
    FormComponent,
    TableComponent
  ],
  providers: [
      TestsService,
      QuestionsService,
      EventsService,
      CandidatesService,
      ...httpInterceptorProviders
  ]
})
export class SharedsModule { }
