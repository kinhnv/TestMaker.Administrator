import { Component, OnInit } from '@angular/core';
import { TableConfig, TableConfigButton } from 'src/app/shareds/components';
import { PageHelper } from 'src/app/shareds/helpers';

@Component({
  selector: 'app-roles',
  template: `<app-table [config]="tableConfig"><app-table>`
})
export class UsersComponent implements OnInit {
  pageHelper = new PageHelper('/user/user');

  addSectionButton: TableConfigButton<any> = {
      title: 'Thêm',
      link: {
          url: this.pageHelper.getCreatingPage()
      }
  };

  tableConfig: TableConfig<any> = {
    title: 'Danh sách tài khoản',
    url: `api/User/Admin/Users`,
    buttons: [this.addSectionButton],
    columns: [{
        property: 'userName',
        title: 'Tài khoản',
        text: '[userName]',
        link: {
            url: this.pageHelper.getDetailsPage('[userId]')
        }
    }]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
