import { Component, OnInit } from '@angular/core';
import { IEventForList } from 'src/app/shareds/models/event/event-for-list.model';
import { EventsService } from 'src/app/shareds/services';
import { TableConfig } from '../../shareds/components';
import { PageHelper } from '../../shareds/helpers';

@Component({
    selector: 'app-event',
    template: '<app-layout><app-table [config]="tableConfig"></app-table></app-layout>',
})
export class EventsComponent implements OnInit {

    pageHelper = new PageHelper('/event/event');

    tableConfig: TableConfig<IEventForList> = {
        title: 'Danh sách sự kiện',
        url: 'api/Event/Admin/Events',
        recycleBinConfig: {
            enable: true,
            deleteEvent: (item, $event)=> {
                console.log(item, $event);
                return this.eventsService.deleteEvent(item.eventId);
            }
        },
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
            property: 'type',
            title: 'Kiểu sự kiện',
            text: '[type]'
        }, {
            property: 'code',
            title: 'Mã',
            text: '[code]'
        }]
    };

    constructor(private eventsService: EventsService) { }

    ngOnInit() {
    }

}
