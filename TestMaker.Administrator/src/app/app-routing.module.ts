import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'test',
    loadChildren: () => import('./pages/test/test.module').then(m => m.TestModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./pages/event/event.module').then(m => m.EventModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
