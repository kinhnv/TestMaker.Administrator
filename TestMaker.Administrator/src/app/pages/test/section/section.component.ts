import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IApiResult } from 'src/app/shareds/models';
import { TestsService } from 'src/app/shareds/services';
import { FormConfig, FormConfigButton, FormHiddenField, FormInput, FormSelect, FormTextArea } from '../../../shareds/components';
import { PageHelper } from '../../../shareds/helpers';

@Component({
  selector: 'app-section',
  template: `
    <app-layout>
      <app-form [config]="formConfig"></app-form>
      <app-questions *ngIf="isDetailsPage" [sectionId]="sectionId"></app-questions>
    </app-layout>
  `
})
export class SectionComponent implements OnInit {
  pageHelper = new PageHelper('/test/section');

  testId!: string;

  get isDetailsPage(): boolean {
    return this.pageHelper.isDetailsPage;
  }

  get sectionId() {
    const pathNameAsArray = location.href.split('?')[0].split('/');
    return pathNameAsArray[pathNameAsArray.length - 1];
  }

  get formTitle(): string {
    return this.pageHelper.isCreatingPage ? 'Thêm phần kiểm tra' :
      this.pageHelper.isDetailsPage ? 'Thông tin phần kiểm tra' :
        'Sửa phần kiểm tra';
  }

  buttonBack: FormConfigButton = {
    title: 'Quay lại bài kiểm tra',
    link: {
      url: `/test/test-details/${this.testId}`
    }
  }

  formTestId = new FormSelect({
    options: [],
    formState: this.testId,
    order: 2,
    title: 'Bài kiểm tra'
  });

  formConfig: FormConfig = {
    id: 'sectionForm',
    title: this.formTitle,
    buttons: [this.buttonBack, this.pageHelper.isEditingPage ? {
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
          this.httpClient.post<IApiResult<{
            sectionId: string;
            name: string;
            description: string;
            testId: string;
          }>>(
            'api/Test/Admin/Sections', value)
            .subscribe((apiResult) => {
              this.router.navigate([this.pageHelper.getDetailsPage(apiResult.data.sectionId)]);
            });
        }
        if (this.pageHelper.isEditingPage) {
          this.httpClient.put<IApiResult<any>>(`api/Test/Admin/Sections/${this.sectionId}`, this.formConfig.form.value)
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
      'testId': this.formTestId
    })
  };

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private testsService: TestsService
  ) {
    this.testId = new URL(location.href.replace('/#', '')).searchParams.get('testId') || '';
    this.formTestId.setValue(this.testId);
  }

  ngOnInit() {
    this.testsService.getTestsAsSelectOptions().subscribe(options => {
      this.formTestId.params.options = options;
    });

    if (!this.pageHelper.isCreatingPage) {
      this.httpClient.get<IApiResult<any>>(`api/Test/Admin/Sections/${this.sectionId}`)
        .subscribe(apiResult => {
          this.testId = (<any>apiResult.data).testId;
          if (this.formConfig.buttons[0].link) {
            this.formConfig.buttons[0].link.url = `/test/test-details/${this.testId}`;
          }
          this.formConfig.form.setValue(apiResult.data);
        });

      this.formTestId.disable();
    }

    if (this.pageHelper.isDetailsPage) {
      this.formConfig.form.disable();
    }
  }
}
