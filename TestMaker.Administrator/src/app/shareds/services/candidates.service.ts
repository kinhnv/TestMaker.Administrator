import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IApiResult, 
    ICandidateForCreating, 
    ICandidateForDetails,
    ICandidateForEditing
} from 'src/app/shareds/models';

@Injectable({
    providedIn: 'root'
})
export class CandidatesService {

    private basePath = 'api/Event/Admin/Candidates';

    constructor(private httpClient: HttpClient) { }

    getCandidate(candidateId: string): Observable<ICandidateForDetails> {
        return this.httpClient.get<IApiResult<ICandidateForDetails>>(`${this.basePath}/${candidateId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    createCandidate(candidate: ICandidateForCreating) {
        return this.httpClient.post<IApiResult<ICandidateForDetails>>(`${this.basePath}`, candidate)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    editCandidate(candidate: ICandidateForEditing) {
        return this.httpClient.put<IApiResult<ICandidateForDetails>>(`${this.basePath}/${candidate.candidateId}`, candidate)
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
