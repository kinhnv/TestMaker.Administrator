import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableConfig } from '../../../shareds/components';
import { PageHelper } from '../../../shareds/helpers';

@Component({
    selector: 'app-questions',
    template: `<app-table [config]="tableConfig"><app-table>`
})
export class QuestionsComponent implements OnInit {
    pageHelper = new PageHelper('/test/question');

    @Input()
    sectionId!: string;

    tableConfig: TableConfig<any> = {
        title: 'Danh sách câu hỏi',
        url: `api/Test/Admin/Questions`,
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
                url: this.pageHelper.getDetailsPage('[questionId]')
            }
        }]
    };

    constructor(
        private router: Router,
    ) { }

    ngOnInit() {
        if (this.sectionId) {
            this.tableConfig.url = `api/Test/Admin/Questions?sectionId=${this.sectionId}`;
            this.tableConfig.buttons = [{
                title: 'Thêm',
                link: {
                    url: this.pageHelper.getCreatingPage(),
                    queryParams: {
                        sectionId: this.sectionId
                    }
                }
            }];
            this.tableConfig.columns = [{
                property: 'name',
                title: 'Tên',
                text: '[name]',
                link: {
                    url: this.pageHelper.getDetailsPage('[questionId]'),
                    queryParams: {
                        sectionId: this.sectionId
                    }
                }
            }];
        }
    }

}
