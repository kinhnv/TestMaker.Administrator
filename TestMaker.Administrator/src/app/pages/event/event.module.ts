import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { HttpClientModule } from '@angular/common/http';
import { EventRoutingModule } from './event-routing.module';
import { SharedsModule } from '../../shareds';
import { EventComponent } from './event/event.component';
import { CandidatesComponent } from './candidates/candidates.component';

@NgModule({
    imports: [
        CommonModule,
        EventRoutingModule,
        SharedsModule,
        HttpClientModule
    ],
    declarations: [EventsComponent, EventComponent, CandidatesComponent]
})
export class EventModule { }
