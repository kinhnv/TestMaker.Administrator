import { Component, OnInit } from '@angular/core';
import { TableConfig, TableConfigButton } from 'src/app/shareds/components';
import { PageHelper } from 'src/app/shareds/helpers';

@Component({
  selector: 'app-roles',
  template: `<app-layout><app-table [config]="tableConfig"></app-table></app-layout>`
})
export class RolesComponent implements OnInit {
  pageHelper = new PageHelper('/user/role');

  addSectionButton: TableConfigButton<any> = {
      title: 'Thêm',
      link: {
          url: this.pageHelper.getCreatingPage()
      }
  };

  tableConfig: TableConfig<any> = {
    title: 'Danh sách quyền',
    url: `api/User/Admin/Roles`,
    buttons: [this.addSectionButton],
    columns: [{
        property: 'name',
        title: 'Tên',
        text: '[name]',
        link: {
            url: this.pageHelper.getDetailsPage('[roleId]')
        }
    }]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
