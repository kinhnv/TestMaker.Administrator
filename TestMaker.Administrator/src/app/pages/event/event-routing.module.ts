import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events.component';

const routes: Routes = [
  {
    path: 'event-list',
    component: EventsComponent,
    data: {
      title: 'Sự kiện'
    }
  },
  {
    path: 'event-creating',
    component: EventComponent,
    data: {
      title: 'Sự kiện'
    }
  },
  {
    path: 'event-details/:id',
    component: EventComponent,
    data: {
      title: 'Sự kiện'
    }
  },
  {
    path: 'event-editing/:id',
    component: EventComponent,
    data: {
      title: 'Sự kiện'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
