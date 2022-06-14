import { Component, OnInit } from '@angular/core';
import { TableConfig } from '../../shareds/components';
import { PageHelper } from '../../shareds/helpers';

@Component({
    selector: 'app-event',
    template: '<app-table [config]="tableConfig"></app-table>',
})
export class EventsComponent implements OnInit {

    pageHelper = new PageHelper('/event/event');

    tableConfig: TableConfig = {
        title: 'Danh sách sự kiện',
        url: 'api/Event/Admin/Events',
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
                url: this.pageHelper.getDetailsPage('[eventId]')
            }
        }, {
            property: 'code',
            title: 'Mã',
            text: '[code]'
        }]
    };

    constructor() { }

    ngOnInit() {
    }

}
