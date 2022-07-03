import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormConfig, FormConfigButton, FormHiddenField, FormInput, TableConfig, TableConfigButton } from 'src/app/shareds/components';
import { PageHelper } from 'src/app/shareds/helpers';
import { RolesService } from 'src/app/shareds/services/roles.service';

@Component({
  selector: 'app-roles',
  template: `<app-form [config]="formConfig"></app-form>`
})
export class RoleComponent implements OnInit {
  pageHelper = new PageHelper('/user/role');

  get roleId() {
    const pathNameAsArray = location.href.split('?')[0].split('/');
    return pathNameAsArray[pathNameAsArray.length - 1];
  }

  get formConfigTitle(): string {
    return this.pageHelper.isCreatingPage ? 'Thêm quyền' :
      this.pageHelper.isDetailsPage ? 'Thông tin quyền' :
        'Sửa quyền';
  }

  get formConfigButtons(): FormConfigButton[] {
    if (this.pageHelper.isCreatingPage) {
      return [{
        title: 'Lưu',
        event: ($event) => {
          const value = this.formConfig.form.value;
          this.rolesService.createRole(value).subscribe((role) => {
              this.router.navigate([this.pageHelper.getDetailsPage(role.roleId)]);
            });
        }
      }, {
        title: 'Quay lại',
        link: {
          url: this.pageHelper.getListPage()
        }
      }]
    }
    if (this.pageHelper.isDetailsPage) {
      return [{
        title: 'Sửa',
        link: {
          url: this.pageHelper.getEditingPage(this.roleId)
        }
      }, {
        title: 'Quay lại',
        link: {
          url: this.pageHelper.getListPage()
        }
      }]
    }

    if (this.pageHelper.isEditingPage) {
      return [{
        title: 'Lưu',
        event: ($event) => {
          this.rolesService.editRole(this.formConfig.form.value).subscribe((role) => {
            this.router.navigate([this.pageHelper.getDetailsPage(role.roleId)]);
          });
        }
      }, {
        title: 'Quay lại',
        link: {
          url: this.pageHelper.getDetailsPage(this.roleId)
        }
      }]
    }
    return [];
  }

  formConfigForm = new FormGroup({
    'userId': new FormHiddenField(''),
    'userName': new FormInput({
      title: 'Tài khoản',
      order: 1,
      validatorOrOpts: Validators.required
    })
  });

  formConfig: FormConfig = {
    id: 'roleForm',
    title: this.formConfigTitle,
    buttons: this.formConfigButtons,
    form: this.formConfigForm
  };

  constructor(
    private rolesService: RolesService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.pageHelper.isCreatingPage) {
      this.rolesService.getRole(this.roleId).subscribe(role => {
        this.formConfig.form.setValue(role);
      });
    }

    if (this.pageHelper.isDetailsPage) {
      this.formConfig.form.disable();
    }
  }
}
