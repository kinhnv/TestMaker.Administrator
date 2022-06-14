import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedsModule } from 'src/app/shareds';
import { HttpClientModule } from '@angular/common/http';
import { TestsComponent } from './tests.component';
import { QuestionComponent } from './question/question.component';
import { QuestionsComponent } from './questions/questions.component';
import { SectionComponent } from './section/section.component';
import { SectionsComponent } from './sections/sections.component';
import { TestComponent } from './test/test.component';
import { TestRoutingModule } from './test-routing.module';



@NgModule({
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedsModule,
    HttpClientModule
  ],
  declarations: [
      TestsComponent,
      TestComponent,
      SectionsComponent,
      SectionComponent,
      QuestionsComponent,
      QuestionComponent
  ],
})
export class TestModule { }
