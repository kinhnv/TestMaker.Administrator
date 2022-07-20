import { FormGroup, Validators } from '@angular/forms';
import { FormInput, FormRadio, FormTable, FormTextArea } from '../../../../shareds/components';
import { IQuestionBase, IQuestionForCreating, IQuestionForDetails, IQuestionForEditing, IQuestionHelper } from '../../../../shareds/models';

interface IMatchingQuestionContent {
    question: string;
    answers: IMatchingQuestionAnswer[];
}

interface IMatchingQuestionAnswer {
    from: string;
    target: number;
}

interface IMatchingQuestion extends IQuestionBase {
    questionId: string;
    question: string;
    answers: IMatchingQuestionAnswer[];
}

export class MatchingQuestionHelper implements IQuestionHelper {
    constructor(private form: FormGroup) {
    }

    getQuestionForCreating(): IQuestionForCreating {
        const question: IMatchingQuestion = this.form.value;
        return {
            contentAsJson: JSON.stringify(<IMatchingQuestionContent>{
                question: question.question,
                answers: question.answers
            }),
            sectionId: question.sectionId,
            type: question.type
        };
    }

    getQuestionForEditing(): IQuestionForEditing {
        const question: IMatchingQuestion = this.form.value;
        return {
            questionId: question.questionId,
            contentAsJson: JSON.stringify(<IMatchingQuestionContent>{
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

        let content: IMatchingQuestionContent = <any>null;

        if (question) {
            content = JSON.parse(question.contentAsJson);
        }
        this.form.addControl('question', new FormTextArea({
            title: 'Câu hỏi',
            order: 3,
            formState: content ? content.question : ''
        }));
        this.form.addControl('answers', new FormTable({
            title: 'Câu trả lời',
            columns: {
                'from': new FormInput({
                    title: 'Bắt đầu',
                    order: 1,
                    validatorOrOpts: Validators.required
                }),
                'target': new FormInput({
                    title: 'Kết thúc',
                    order: 2,
                    validatorOrOpts: Validators.required
                })
            },
            order: 4,
            formState: content ? content.answers : []
        }));
    }
}
