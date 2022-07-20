import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormConfig, FormHiddenField, FormInput, FormSelect, FormTextArea } from '../../../shareds/components';
import { PageHelper } from '../../../shareds/helpers';
import { EventsService } from '../../../shareds/services';
import { TestsService } from '../../../shareds/services/tests.service';

@Component({
    selector: 'app-event',
    template: `
    <app-layout>
        <app-form [config]="formConfig"></app-form>
        <app-candidates *ngIf="pageHelper.isDetailsPage" [eventId]="eventId"></app-candidates>
    </app-layout>
    `
})
export class EventComponent implements OnInit {

    pageHelper = new PageHelper('/event/event');

    constructor(
        private eventsService: EventsService,
        private testsService: TestsService,
        private router: Router
    ) { }

    get eventId(): string {
        const pathNameAsArray = location.href.split('/');
        return pathNameAsArray[pathNameAsArray.length - 1];
    }

    get title(): string {
        return this.pageHelper.isCreatingPage ? 'Thêm sự kiện' :
            this.pageHelper.isDetailsPage ? 'Thông tin sự kiện' : 'Sửa sự kiện';
    }

    formScopeType = new FormSelect({
        title: 'Phạm vi sự kiện',
        options: [],
        order: 2,
        events: {}
    });

    formquestionContentType = new FormSelect({
        title: 'Nội dung sự kiện',
        options: [],
        order: 3,
        events: {}
    });

    formMarkingType = new FormSelect({
        title: 'Kiểu chấm',
        options: [],
        order: 4,
        events: {}
    })

    formTestId = new FormSelect({
        title: 'Bài kiểm tra',
        options: [],
        order: 5,
        events: {}
    });

    formConfig: FormConfig = {
        id: 'eventForm',
        title: this.title,
        buttons: [{
            title: 'Danh sách',
            link: {
                url: this.pageHelper.getListPage()
            }
        }, this.pageHelper.isEditingPage ? {
            title: 'Quay lại',
            link: {
                url: this.pageHelper.getDetailsPage(this.eventId)
            }
        } : <any>null, {
            title: this.pageHelper.isDetailsPage ? 'Sửa' :
                this.pageHelper.isEditingPage ? 'Lưu' : 'Thêm',
            link: this.pageHelper.isDetailsPage ? {
                url: this.pageHelper.getEditingPage(this.eventId)
            } : null,
            event: this.pageHelper.isDetailsPage ? null : ($event) => {
                this.onSubmit($event);
            }
        }],
        form: new FormGroup({
            'eventId': new FormHiddenField(''),
            'name': new FormInput({
                title: 'Tên',
                order: 1,
                validatorOrOpts: Validators.required
            }),
            'scopeType': this.formScopeType,
            'questionContentType': this.formquestionContentType,
            'markingType': this.formMarkingType,
            'testId': this.formTestId
        })
    };

    ngOnInit() {
        this.testsService.getEventScopeType().subscribe(options => {
            this.formScopeType.params.options = options;
        });

        this.testsService.getEventQuestionContentType().subscribe(options => {
            this.formquestionContentType.params.options = options;
        });

        this.testsService.getEventMarkingType().subscribe(options => {
            this.formMarkingType.params.options = options;
        });

        this.testsService.getTestsAsSelectOptions().subscribe(options => {
            this.formTestId.params.options = options;
        });

        if (!this.pageHelper.isCreatingPage) {
            this.formConfig.form.addControl('code', new FormInput({
                title: 'Mã',
                order: 2
            }));
            this.eventsService.getEvent(this.eventId).subscribe(event => {
                this.formConfig.form.setValue(event);
            });

            if (this.pageHelper.isEditingPage) {
                var form = this.formConfig.form.get('code')
                if (form){
                    form.disable();
                }
            }
        }

        if (this.pageHelper.isDetailsPage) {
            this.formConfig.form.disable();
        }
    }

    onSubmit($event: any) {
        const value = this.formConfig.form.value;
        if (this.pageHelper.isCreatingPage) {
            this.eventsService.createEvent({
                name: value.name,
                scopeType: value.scopeType,
                questionContentType: value.questionContentType,
                markingType: value.markingType,
                testId: value.testId
            }).subscribe((event) => {
                this.router.navigate([this.pageHelper.getDetailsPage(event.eventId)]);
            });
        }
        if (this.pageHelper.isEditingPage) {
            this.eventsService.editEvent({
                eventId: value.eventId,
                name: value.name,
                scopeType: value.scopeType,
                questionContentType: value.questionContentType,
                markingType: value.markingType,
                testId: value.testId
            }).subscribe(() => {
                this.router.navigate([this.pageHelper.getDetailsPage(value.eventId)]);
            });
        }
    }
}
