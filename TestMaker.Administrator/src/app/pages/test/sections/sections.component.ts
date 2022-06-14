import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableConfig } from '../../../shareds/components';
import { PageHelper } from '../../../shareds/helpers';

@Component({
    selector: 'app-sections',
    template: `<app-table [config]="tableConfig"><app-table>`
})
export class SectionsComponent implements OnInit {
    pageHelper = new PageHelper('/test/section');

    @Input()
    testId!: string;

    tableConfig: TableConfig = {
        title: 'Danh sách phần kiểm tra',
        url: `api/Test/Admin/Sections`,
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
                url: this.pageHelper.getDetailsPage('[sectionId]')
            }
        }]
    };

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        console.log(this.testId);
        if (this.testId) {
            // this.tableConfig.buttons.find(x => x.title === 'Thêm').link.queryParams = {
            //     testId: this.testId
            // };

            this.tableConfig.columns = [{
                property: 'name',
                title: 'Tên',
                text: '[name]',
                link: {
                    url: this.pageHelper.getDetailsPage('[sectionId]')
                }
            }];
        }
    }

}
