import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IApiResult } from '../models';
import { IQuestionForCreating, IQuestionForEditing, IQuestionForDetails } from '../models/question.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    constructor(private httpClient: HttpClient) { }

    getQuestion(questionId: string) {
        return this.httpClient.get<IApiResult<any>>(`api/Test/Admin/Questions/${questionId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    createQuestion(question: IQuestionForCreating) {
        return this.httpClient.post<IApiResult<IQuestionForDetails>>(`api/Test/Admin/Questions`, question)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    updateQuestion(question: IQuestionForEditing) {
        return this.httpClient.put<IApiResult<{
            questionId: string;
        }>>(`api/Test/Admin/Questions/${question.questionId}`, question)
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
