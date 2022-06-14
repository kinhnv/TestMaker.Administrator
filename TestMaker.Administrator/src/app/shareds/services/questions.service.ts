import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IQuestionForCreating, IQuestionForEditing, IQuestionForDetails } from '../models/question.model';

@Injectable({
    providedIn: 'root'
})
export class QuestionsService {
    constructor(private httpClient: HttpClient) { }

    getQuestion(questionId: string) {
        return this.httpClient.get<any>(`api/Test/Admin/Questions/${questionId}`);
    }

    createQuestion(question: IQuestionForCreating) {
        return this.httpClient.post<IQuestionForDetails>(`api/Test/Admin/Questions`, question);
    }

    updateQuestion(question: IQuestionForEditing) {
        return this.httpClient.put<{
            questionId: string;
        }>(`api/Test/Admin/Questions/${question.questionId}`, question);
    }
}
