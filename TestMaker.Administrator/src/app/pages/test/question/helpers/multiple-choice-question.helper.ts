import { FormGroup, Validators } from '@angular/forms';
import { FormInput, FormRadio, FormTable, FormTextArea } from '../../../../shareds/components';
import { IQuestionBase, IQuestionForCreating, IQuestionForDetails, IQuestionForEditing, IQuestionHelper } from '../../../../shareds/models';

interface IMultipleChoiceQuestionAnswer {
    answer: string;
    isCorrect: boolean;
    rationale: string;
}

interface IMultipleChoiceQuestion extends IQuestionBase {
    questionId: string;
    question: string;
    answers: IMultipleChoiceQuestionAnswer[];
}

interface IMultipleChoiceQuestionContent {
    question: string;
    answers: IMultipleChoiceQuestionAnswer[];
}

export class MultipleChoiceQuestionHelper implements IQuestionHelper {
    isCorrectOptions = [{
        value: true, title: 'Đúng'
    }, {
        value: false, title: 'Sai'
    }];

    constructor(private form: FormGroup) {
    }

    getQuestionForCreating(): IQuestionForCreating {
        const question: IMultipleChoiceQuestion = this.form.value;
        return {
            contentAsJson: JSON.stringify({
                question: question.question,
                answers: question.answers
            }),
            sectionId: question.sectionId,
            type: question.type
        };
    }

    getQuestionForEditing(): IQuestionForEditing {
        const question: IMultipleChoiceQuestion = this.form.value;
        return {
            questionId: question.questionId,
            contentAsJson: JSON.stringify({
                question: question.question,
                answers: question.answers
            }),
            sectionId: question.sectionId,
            type: question.type
        };
    }

    changeForm(question?: IQuestionForDetails) {
        this.form.removeControl('question');
        this.form.removeControl('isFromAPrivateCollection');
        this.form.removeControl('answers');
        this.form.removeControl('blanks');

        let value: IMultipleChoiceQuestion = <any>null;

        if (question) {
            const content: IMultipleChoiceQuestionContent = JSON.parse(question.contentAsJson);
            value = {
                questionId: question.questionId,
                sectionId: question.sectionId,
                type: question.type,
                question: content.question,
                answers: content.answers
            };
            if (value.answers) {
                value.answers.forEach(answer =>{
                    if (!answer.rationale) {
                        answer.rationale = '';
                    }
                })
            }
        }
        this.form.addControl('question', new FormTextArea({
            title: 'Câu hỏi',
            order: 3,
            formState: value ? value.question : ''
        }));
        this.form.addControl('answers', new FormTable({
            title: 'Câu trả lời',
            columns: {
                'answer': new FormInput({
                    title: 'Câu trả lời',
                    order: 1,
                    validatorOrOpts: Validators.required
                }),
                'isCorrect': new FormRadio({
                    title: 'Là câu trả lời đúng',
                    options: this.isCorrectOptions,
                    order: 2,
                    formState: false,
                    validatorOrOpts: Validators.required
                }),
                'rationale': new FormTextArea({
                    title: 'Lý do',
                    order: 3
                })
            },
            formState: value ? value.answers : [],
            order: 4
        }));
    }
}
