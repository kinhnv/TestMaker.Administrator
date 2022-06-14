import { FormGroup } from '@angular/forms';
import { FormInput, FormRadio, FormTable, FormTextArea } from '../../../../shareds/components';
import { IQuestionBase, IQuestionForCreating, IQuestionForDetails, IQuestionForEditing, IQuestionHelper } from '../../../../shareds/models';

interface IBlankFillingQuestionContent {
    question: string;
    isFromAPrivateCollection: boolean;
    blanks: IBlankFillingQuestionAnswer[];
}

interface IBlankFillingQuestionAnswer {
    position: string;
    answer: string;
}

interface IBlankFillingQuestion extends IQuestionBase {
    questionId: string;
    question: string;
    isFromAPrivateCollection: boolean;
    blanks: IBlankFillingQuestionAnswer[];
}

export class BlankFillingQuestionHelper implements IQuestionHelper {

    constructor(private form: FormGroup) {
    }

    getQuestionForCreating(): IQuestionForCreating {
        const question: IBlankFillingQuestion = this.form.value;
        return {
            name: question.name,
            contentAsJson: JSON.stringify(<IBlankFillingQuestionContent>{
                question: question.question,
                isFromAPrivateCollection: question.isFromAPrivateCollection,
                blanks: question.blanks
            }),
            sectionId: question.sectionId,
            type: question.type
        };
    }

    getQuestionForEditing(): IQuestionForEditing {
        const question: IBlankFillingQuestion = this.form.value;
        return {
            questionId: question.questionId,
            name: question.name,
            contentAsJson: JSON.stringify(<IBlankFillingQuestionContent>{
                question: question.question,
                isFromAPrivateCollection: question.isFromAPrivateCollection,
                blanks: question.blanks
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

        let content: IBlankFillingQuestionContent = <any>null;

        if (question) {
            content = JSON.parse(question.contentAsJson);
        }
        this.form.addControl('isFromAPrivateCollection', new FormRadio({
            title: 'Nguồn từ',
            options: [{
                title: 'Riêng từng từ',
                value: true
            }, {
                title: 'Nhóm chung',
                value: false
            }],
            order: 3,
            formState: content ? content.isFromAPrivateCollection : false,
            events: {
                change: ($event) => {
                    this.changeTypeOfCollection();
                }
            }
        }));
        this.form.addControl('question', new FormTextArea({
            title: 'Câu hỏi',
            order: 4,
            events: {
                change: ($event, row) => {
                    this.changeTypeOfCollection();
                }
            },
            formState: content ? content.question : ''
        }));

        if (content && content.isFromAPrivateCollection) {
            this.form.addControl('blanks', new FormTable({
                title: 'Câu trả lời',
                columns: {
                    'position': new FormInput({
                        title: 'Vị trí',
                        order: 1
                    }),
                    'answer': new FormInput({
                        title: 'Câu trả lời',
                        order: 2
                    })
                },
                order: 5,
                formState: content ? content.blanks : []
            }));
        }
    }

    private changeTypeOfCollection() {
        const isFromAPrivateCollection = this.form.controls['isFromAPrivateCollection'].value;
        const formTextArea = this.form.controls['question'];

        if (isFromAPrivateCollection) {
            const answersFromQuestion = this.buildAnswersValueFromQuestionValue(formTextArea.value);
            this.addBlanks([]);

            const formTable: any = this.form.controls['blanks'];
            const answers: IBlankFillingQuestionAnswer[] = formTable.value;

            const blanks = formTextArea.value.match(/blank_[0->9]*\(/g);

            answersFromQuestion.forEach(answerFromQuestion => {
                const index = answers.findIndex(x => x.position === answerFromQuestion.position);
                if (index >= 0) {

                    if (answers[index].answer.indexOf(answerFromQuestion.answer) < 0) {
                        answers[index].answer += `,${answerFromQuestion.answer}`;
                    }
                } else {
                    formTable.addFormGroup();
                    answers.push({
                        position: answerFromQuestion.position,
                        answer: answerFromQuestion.answer
                    });
                }
            });

            formTable.setValue(answers);
        } else {
            this.form.removeControl('blanks');
        }
    }

    private addBlanks(answers: IBlankFillingQuestionAnswer[]) {
        if (!this.form.controls['blanks']) {
            this.form.addControl('blanks', new FormTable({
                title: 'Chỗ điền',
                columns: {
                    'position': new FormInput({
                        title: 'Vị trí',
                        order: 1
                    }),
                    'answer': new FormInput({
                        title: 'Câu trả lời',
                        order: 2
                    })
                },
                order: 4,
                formState: answers
            }));
        }
    }

    private buildAnswersValueFromQuestionValue(value: string) {
        const answers: IBlankFillingQuestionAnswer[] = [];

        const blanks = value.match(/blank_[0->9]*\(/g);

        function getWord(blank: string) {
            const from = value.indexOf(blank);
            let word = '';
            for (let index = from; index < value.length; index++) {
                const element = value.charAt(index);
                if (element === '(') {
                    word = '';
                } else if (element === ')') {
                    return word;
                } else {
                    word += element;
                }
            }
            return word;
        }

        if (blanks) {
            blanks.forEach(blank => {
                answers.push({
                    position: blank.replace('(', ''),
                    answer: getWord(blank)
                });
            });
        }
        return answers;
    }
}
