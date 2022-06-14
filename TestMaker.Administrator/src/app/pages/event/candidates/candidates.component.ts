import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableConfig } from '../../../shareds/components';
import { PageHelper } from '../../../shareds/helpers';
import { CandidatesService } from '../../../shareds/services/candidates.service';

@Component({
    selector: 'app-candidates',
    template: `<app-table [config]="tableConfig"><app-table>`
})
export class CandidatesComponent implements OnInit {
    pageHelper = new PageHelper('/event/candidate');

    @Input()
    eventId!: string;

    tableConfig: TableConfig = {
        title: 'Danh sách thí sinh',
        url: `api/Event/Admin/Candidates`,
        buttons: [{
            title: 'Thêm',
            event: ($event) => {
                this.candidatesService.createCandidate({
                    eventId: this.eventId
                }).subscribe(() => {
                    window.location.reload();
                });
            }
        }],
        columns: [{
            property: 'code',
            title: 'Mã',
            text: '[code]'
        }, {
            property: 'answer',
            title: '',
            text: 'Câu trả lời',
            link: {
                url: this.pageHelper.getDetailsPage('[candidateId]')
            }
        }]
    };

    constructor(private candidatesService: CandidatesService) { }

    ngOnInit() {
        if (this.eventId) {
            this.tableConfig.url = `api/Event/Admin/Candidates?eventId=${this.eventId}`;
        }
    }
}
