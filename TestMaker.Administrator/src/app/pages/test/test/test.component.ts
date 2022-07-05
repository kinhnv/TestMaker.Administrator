import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormConfig, FormHiddenField, FormInput, FormTextArea } from '../../../shareds/components/form';
import { PageHelper } from '../../../shareds/helpers';
import { TestsService } from '../../../shareds/services/tests.service';

@Component({
    selector: 'app-test',
    styles: ['app-sections { margin-top: 20px; }'],
    template: `
        <app-layout>
            <app-form [config]="formConfig"></app-form>
            <app-sections *ngIf="isDetailsPage" [testId]="testId"></app-sections>
        </app-layout>
    `
})
export class TestComponent implements OnInit {
    pageHelper = new PageHelper('/test/test');

    constructor(
        private router: Router,
        private testsService: TestsService
    ) { }

    get testId(): string {
        const pathNameAsArray = location.href.split('/');
        return pathNameAsArray[pathNameAsArray.length - 1];
    }

    get isDetailsPage(): boolean {
        return location.href.indexOf('/test/test-details/') >= 0;
    }

    formConfig: FormConfig = {
        id: 'testForm',
        title: this.pageHelper.isCreatingPage ? 'Thêm bài kiểm tra mới' :
            this.pageHelper.isDetailsPage ? 'Thông tin bài kiểm tra' : 'Sửa bài kiểm tra',
        buttons: [{
            title: 'Danh sách',
            link: {
                url: `/test/test-list`
            }
        }, this.pageHelper.isEditingPage ? {
            title: 'Quay lại',
            link: {
                url: this.pageHelper.getDetailsPage(this.testId)
            }
        } : <any>null, {
            title: this.pageHelper.isDetailsPage ? 'Sửa' :
                this.pageHelper.isEditingPage ? 'Lưu' : 'Thêm',
            link: this.pageHelper.isDetailsPage ? {
                url: this.pageHelper.getEditingPage(this.testId)
            } : null,
            event: this.pageHelper.isDetailsPage ? null : ($event) => {
                const value = this.formConfig.form.value;
                if (this.pageHelper.isCreatingPage) {

                    this.testsService.createTest({
                        name: value.name,
                        description: value.description
                    }).subscribe((test) => {
                        this.router.navigate([this.pageHelper.getDetailsPage(test.testId)]);
                    });

                }
                if (this.pageHelper.isEditingPage) {
                    this.testsService.editTest({
                        testId: value.testId,
                        name: value.name,
                        description: value.description
                    }).subscribe(() => {
                        this.router.navigate([this.pageHelper.getDetailsPage(this.testId)]);
                    });
                }
            }
        }],
        form: new FormGroup({
            'testId': new FormHiddenField(''),
            'name': new FormInput({
                title: 'Tên',
                order: 1, 
                validatorOrOpts: Validators.required
            }),
            'description': new FormTextArea({
                title: 'Mô tả',
                order: 2
            })
        })
    };

    ngOnInit() {
        if (!this.pageHelper.isCreatingPage) {
            this.testsService.getTest(this.testId)
                .subscribe(test => {
                    this.formConfig.form.setValue(test);
                });
        }

        if (this.pageHelper.isDetailsPage) {
            this.formConfig.form.disable();
        }
    }
}
