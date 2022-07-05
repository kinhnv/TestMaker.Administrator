import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent, FormControlComponent, LayoutComponent, TableComponent } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { httpInterceptorProviders } from './interceptors';
import { TestsService, CandidatesService, EventsService, QuestionsService, UsersService, RolesService } from './services';
import { TitleComponent } from './components/title/title.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    LayoutComponent,
    FormControlComponent,
    FormComponent,
    TableComponent,
    TitleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    LayoutComponent,
    FormComponent,
    TableComponent
  ],
  providers: [
    AuthService,
    CandidatesService,
    EventsService,
    QuestionsService,
    RolesService,
    TestsService,
    UsersService,
    ...httpInterceptorProviders
  ]
})
export class SharedsModule { }
