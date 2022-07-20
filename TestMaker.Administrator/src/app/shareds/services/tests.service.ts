import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SelectOption } from '../components';
import { IApiResult } from '../models';

export class TestBase {
    name!: string;
    description!: string;
}

export class TestForCreating extends TestBase {
}

export class TestForDetails extends TestBase {
    testId!: string;
}

export class TestForEditing extends TestBase {
    testId!: string;
}

@Injectable({
    providedIn: 'root'
})
export class TestsService {

    constructor(private httpClient: HttpClient) { }

    getTestsAsSelectOptions() {
        return this.httpClient.get<IApiResult<SelectOption[]>>(`api/Test/Admin/Tests/selectoptions`)
            .pipe(
                map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );
    }

    getEventScopeType() {
        return this.httpClient.get<IApiResult<SelectOption[]>>(`api/Event/Admin/Events/ScopeType`)
            .pipe(
                map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );
    }

    getEventQuestionContentType() {
        return this.httpClient.get<IApiResult<SelectOption[]>>(`api/Event/Admin/Events/QuestionContentType`)
            .pipe(
                map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );
    }

    getEventMarkingType() {
        return this.httpClient.get<IApiResult<SelectOption[]>>(`api/Event/Admin/Events/MarkingType`)
            .pipe(
                map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );
    }

    getTest(testId: string): Observable<TestForDetails> {
        return this.httpClient.get<IApiResult<TestForDetails>>(`api/Test/Admin/Tests/${testId}`)
            .pipe(
                map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );;
    }

    createTest(test: TestForCreating) {
        return this.httpClient.post<IApiResult<TestForDetails>>(`api/Test/Admin/Tests`, test)
            .pipe(
                map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );;
    }

    editTest(test: TestForEditing) {
        return this.httpClient.put<IApiResult<TestForDetails>>(`api/Test/Admin/Tests/${test.testId}`, test)
            .pipe(map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );
    }
}
