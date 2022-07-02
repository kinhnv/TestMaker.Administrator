import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    IApiResult,
    IEventForCreating,
    IEventForDetails,
    IEventForEditing
} from 'src/app/shareds/models';

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    constructor(private httpClient: HttpClient) { }

    getEvent(eventId: string): Observable<IEventForDetails> {
        return this.httpClient.get<IApiResult<IEventForDetails>>(`api/Event/Admin/Events/${eventId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    createEvent(event: IEventForCreating) {
        return this.httpClient.post<IApiResult<IEventForDetails>>(`api/Event/Admin/Events`, event)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    editEvent(event: IEventForEditing) {
        return this.httpClient.put<IApiResult<IEventForDetails>>(`api/Event/Admin/Events/${event.eventId}`, event)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    deleteEvent(eventId: string) {
        return this.httpClient.delete<IApiResult<void>>(`api/Event/Admin/Events/${eventId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }
}
