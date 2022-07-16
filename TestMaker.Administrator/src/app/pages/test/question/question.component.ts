import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
    FormConfig,
    FormHiddenField,
    FormSelect,
} from '../../../shareds/components';
import { PageHelper } from '../../../shareds/helpers';
import { IQuestionHelper, QUESTION_TYPE, QUESTION_TYPES } from '../../../shareds/models';
import { QuestionsService } from '../../../shareds/services';
import { BlankFillingQuestionHelper } from './helpers/blank-filling-question.helper';
import { MatchingQuestionHelper } from './helpers/matching-question.helper';
import { MultipleChoiceQuestionHelper } from './helpers/multiple-choice-question.helper';
import { SortingQuestionHelper } from './helpers/sorting-question.helper';

@Component({
    selector: 'app-question',
    template: '<app-layout><app-form [config]="formConfig"></app-form></app-layout>'
})
export class QuestionComponent implements OnInit {
    pageHelper = new PageHelper('/test/question');
    questionHelper: IQuestionHelper = <any>null;

    get sectionId() {
        return new URL(location.href.replace('/#', '')).searchParams.get('sectionId');
    }

    get questionId() {
        const pathNameAsArray = location.href.split('?')[0].split('/');
        return pathNameAsArray[pathNameAsArray.length - 1];
    }

    get formTitle(): string {
        return this.pageHelper.isCreatingPage ? 'Thêm câu hỏi' :
            this.pageHelper.isDetailsPage ? 'Thông tin câu hỏi' :
                'Sửa câu hỏi';
    }

    get buttons(): {
        title: string;
        link?: {
            url: string;
            queryParams?: any;
        }
        event?: ($event: any) => void;
    }[] {
        return [{
            title: 'Quay lại phần kiểm tra',
            link: {
                url: `/test/section-details/${this.sectionId}`
            }
        }, this.pageHelper.isEditingPage ? {
            title: 'Quay lại',
            link: {
                url: this.pageHelper.getDetailsPage(this.questionId),
                queryParams: {
                    sectionId: this.sectionId
                }
            }
        } : <any>null, {
            title: this.pageHelper.isCreatingPage ? 'Thêm' :
                this.pageHelper.isDetailsPage ? 'Sửa' : 'Lưu',
            link: this.pageHelper.isDetailsPage ? {
                url: this.pageHelper.getEditingPage(this.questionId),
                queryParams: {
                    sectionId: this.sectionId
                }
            } : null,
            event: !this.pageHelper.isDetailsPage ? ($event: any) => this.submitEvent($event) : null
        }];
    }

    formConfig: FormConfig = {
        id: 'questionForm',
        title: this.formTitle,
        // buttons: [],
        buttons: this.buttons,
        form: new FormGroup({
            'questionId': new FormHiddenField(''),
            'type': new FormSelect({
                title: 'Kiểu câu hỏi',
                options: QUESTION_TYPES,
                order: 2,
                formState: QUESTION_TYPE.MultipleChoiceQuestion,
                events: {
                    'change': $event => {
                        this.updateQuestionHelper();
                        this.questionHelper.changeForm();
                    }
                },
                validatorOrOpts: Validators.required
            }),
            'sectionId': new FormHiddenField(this.sectionId)
        })
    };

    constructor(
        private router: Router,
        private questionsService: QuestionsService
    ) {
    }

    ngOnInit() {
        if (!this.pageHelper.isCreatingPage) {
            this.questionsService.getQuestion(this.questionId).subscribe(question => {

                this.formConfig.form.setValue({
                    questionId: question.questionId,
                    type: question.type,
                    sectionId: question.sectionId
                });

                this.updateQuestionHelper();
                this.questionHelper.changeForm(question);

                if (this.pageHelper.isDetailsPage) {
                    this.formConfig.form.disable();
                }
            });
        } else {
            this.updateQuestionHelper();
            this.questionHelper.changeForm();
        }
    }

    submitEvent($event: any) {
        this.createOrEditQuestion();
    }

    createOrEditQuestion() {
        if (this.pageHelper.isCreatingPage) {
            this.questionsService.createQuestion(this.questionHelper.getQuestionForCreating())
                .subscribe((question) => {
                    this.router.navigate(
                        [this.pageHelper.getDetailsPage(question.questionId)],
                        { queryParams: { sectionId: question.sectionId } });
                });
        }
        if (this.pageHelper.isEditingPage) {
            this.questionsService.updateQuestion(this.questionHelper.getQuestionForEditing())
                .subscribe(() => {
                    this.router.navigate(
                        [this.pageHelper.getDetailsPage(this.questionId)],
                        { queryParams: { sectionId: this.sectionId } });
                });
        }
    }

    updateQuestionHelper() {
        const type = +this.formConfig.form.controls['type'].value;
        switch (type) {
            case QUESTION_TYPE.MultipleChoiceQuestion: {
                this.questionHelper = new MultipleChoiceQuestionHelper(this.formConfig.form);
                break;
            }
            case QUESTION_TYPE.BlankFillingQuestion: {
                this.questionHelper = new BlankFillingQuestionHelper(this.formConfig.form);
                break;
            }
            case QUESTION_TYPE.SortingQuestion: {
                this.questionHelper = new SortingQuestionHelper(this.formConfig.form);
                break;
            }
            case QUESTION_TYPE.MatchingQuestion: {
                this.questionHelper = new MatchingQuestionHelper(this.formConfig.form);
                break;
            }
        }
    }
}
