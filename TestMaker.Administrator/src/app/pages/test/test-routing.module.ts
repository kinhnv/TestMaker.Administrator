import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { QuestionsComponent } from './questions/questions.component';
import { SectionComponent } from './section/section.component';
import { TestComponent } from './test/test.component';
import { TestsComponent } from './tests.component';

const routes: Routes = [
  {
    path: 'test-list',
    component: TestsComponent
  },
  {
    path: 'test-creating',
    component: TestComponent
  },
  {
    path: 'test-details/:id',
    component: TestComponent
  },
  {
    path: 'test-editing/:id',
    component: TestComponent
  },
  {
    path: 'section-list',
    component: TestsComponent
  },
  {
    path: 'section-creating',
    component: SectionComponent
  },
  {
    path: 'section-details/:id',
    component: SectionComponent
  },
  {
    path: 'section-editing/:id',
    component: SectionComponent
  },
  {
    path: 'question-list',
    component: QuestionsComponent
  },
  {
    path: 'question-creating',
    component: QuestionComponent
  },
  {
    path: 'question-details/:id',
    component: QuestionComponent
  },
  {
    path: 'question-editing/:id',
    component: QuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {}
