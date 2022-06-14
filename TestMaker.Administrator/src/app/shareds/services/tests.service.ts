import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectOption } from '../components';

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
        return this.httpClient.get<SelectOption[]>(`api/Test/Admin/Tests/selectoptions`);
    }
    
    getEventTypeSelectOptions() {
        return this.httpClient.get<SelectOption[]>(`api/Event/Admin/Events/Type`);
    }

    getTest(testId: string): Observable<TestForDetails> {
        return this.httpClient.get<TestForDetails>(`api/Test/Admin/Tests/${testId}`);
    }

    createTest(test: TestForCreating) {
        return this.httpClient.post<TestForDetails>(`api/Test/Admin/Tests`, test);
    }

    editTest(test: TestForEditing) {
        return this.httpClient.put<TestForDetails>(`api/Test/Admin/Tests/${test.testId}`, test);
    }
}
