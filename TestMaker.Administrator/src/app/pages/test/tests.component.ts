import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormConfig, FormInput, FormRadio, FormTable, TableConfig } from '../../shareds/components';
import { PageHelper } from '../../shareds/helpers';

@Component({
    selector: 'app-test',
    template: `<app-table [config]="tableConfig"></app-table>`
})
export class TestsComponent implements OnInit {
    pageHelper = new PageHelper('/test/test');

    constructor() { }

    tableConfig: TableConfig<any> = {
        title: 'Danh sách bài kiểm tra',
        url: 'api/Test/Admin/Tests',
        buttons: [{
            title: 'Thêm',
            link: {
                url: this.pageHelper.getCreatingPage()
            }
        }],
        columns: [{
            property: 'name',
            title: 'Tên',
            text: '[name]',
            link: {
                url: this.pageHelper.getDetailsPage('[testId]')
            }
        }]
    };

    ngOnInit() {
    }

}
