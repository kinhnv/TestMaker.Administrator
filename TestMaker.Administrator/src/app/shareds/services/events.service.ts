import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class EventBase {
    name!: string;
    type!: string;
    testId!: string;
}

export class EventForCreating extends EventBase { }

export class EventForDetails extends EventBase {
    eventId!: string;
    code!: string;
}

export class EventForEditing extends EventBase {
    eventId!: string;
}

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    constructor(private httpClient: HttpClient) { }

    getEvent(eventId: string): Observable<EventForDetails> {
        return this.httpClient.get<EventForDetails>(`api/Event/Admin/Events/${eventId}`);
    }

    createEvent(event: EventForCreating) {
        return this.httpClient.post<EventForDetails>(`api/Event/Admin/Events`, event);
    }

    editEvent(event: EventForEditing) {
        return this.httpClient.put<EventForDetails>(`api/Event/Admin/Events/${event.eventId}`, event);
    }
}
