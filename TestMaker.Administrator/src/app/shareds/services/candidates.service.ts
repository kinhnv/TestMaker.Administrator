import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class CandidateBase {
    eventId!: string;
}

export class CandidateForCreating extends CandidateBase { }

export class CandidateForDetails extends CandidateBase {
    candidateId!: string;
    code!: string;
}

export class CandidateForEditing extends CandidateBase {
    candidateId!: string;
}

@Injectable({
    providedIn: 'root'
})
export class CandidatesService {

    private basePath = 'api/Event/Admin/Candidates';

    constructor(private httpClient: HttpClient) { }

    getCandidate(candidateId: string): Observable<CandidateForDetails> {
        return this.httpClient.get<CandidateForDetails>(`${this.basePath}/${candidateId}`);
    }

    createCandidate(candidate: CandidateForCreating) {
        return this.httpClient.post<CandidateForDetails>(`${this.basePath}`, candidate);
    }

    editCandidate(candidate: CandidateForEditing) {
        return this.httpClient.put<CandidateForDetails>(`${this.basePath}/${candidate.candidateId}`, candidate);
    }
}
