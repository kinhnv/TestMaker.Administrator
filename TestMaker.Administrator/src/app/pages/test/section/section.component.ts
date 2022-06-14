import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormConfig, FormHiddenField, FormInput, FormTextArea } from '../../../shareds/components';
import { PageHelper } from '../../../shareds/helpers';

@Component({
    selector: 'app-section',
    template: `
  <app-form [config]="formConfig"></app-form>
  <app-questions *ngIf="isDetailsPage" [sectionId]="sectionId"><app-questions>
  `
})
export class SectionComponent implements OnInit {
    pageHelper = new PageHelper('/test/section');

    get isDetailsPage(): boolean {
        return this.pageHelper.isDetailsPage;
    }

    testId!: string;

    get sectionId() {
        const pathNameAsArray = location.href.split('?')[0].split('/');
        return pathNameAsArray[pathNameAsArray.length - 1];
    }

    formConfig: FormConfig = {
        id: 'sectionForm',
        title: this.pageHelper.isCreatingPage ? 'Thêm phần kiểm tra' :
            this.pageHelper.isDetailsPage ? 'Thông tin phần kiểm tra' :
                'Sửa phần kiểm tra',
        buttons: [{
            title: 'Quay lại bài kiểm tra',
            link: {
                url: `/test/test-details/${this.testId}`
            }
        }, this.pageHelper.isEditingPage ? {
            title: 'Quay lại',
            link: {
                url: this.pageHelper.getDetailsPage(this.sectionId)
            }
        } : <any>null, {
            title: this.pageHelper.isCreatingPage ? 'Thêm' :
                this.pageHelper.isDetailsPage ? 'Sửa' : 'Lưu',
            link: this.pageHelper.isDetailsPage ? {
                url: this.pageHelper.getEditingPage(this.sectionId)
            } : null,
            event: !this.pageHelper.isDetailsPage ? ($event) => {
                if (this.pageHelper.isCreatingPage) {
                    const value = this.formConfig.form.value;
                    value.sectionId = undefined;
                    this.httpClient.post<{
                        sectionId: string;
                        name: string;
                        description: string;
                        testId: string;
                    }>(
                        'api/Test/Admin/Sections', value)
                        .subscribe((section) => {
                            this.router.navigate([this.pageHelper.getDetailsPage(this.sectionId)]);
                        });
                }
                if (this.pageHelper.isEditingPage) {
                    this.httpClient.put(`api/Test/Admin/Sections/${this.sectionId}`, this.formConfig.form.value)
                        .subscribe(() => {
                            this.router.navigate([this.pageHelper.getDetailsPage(this.sectionId)]);
                        });
                }
            } : null
        }],
        form: new FormGroup({
            'sectionId': new FormHiddenField(''),
            'name': new FormInput({
                title: 'Tên',
                order: 1,
                validatorOrOpts: Validators.required
            }),
            'testId': new FormHiddenField(this.testId)
        })
    };

    constructor(
        private httpClient: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
        if (!this.pageHelper.isCreatingPage) {
            this.httpClient.get(`api/Test/Admin/Sections/${this.sectionId}`)
                .subscribe(section => {
                    this.testId = (<any>section).testId;
                    if (this.formConfig.buttons[0].link){
                        this.formConfig.buttons[0].link.url = `/test/test-details/${this.testId}`;
                    }
                    this.formConfig.form.setValue(section);
                });
        }

        if (this.pageHelper.isDetailsPage) {
            this.formConfig.form.disable();
        }
    }
}
