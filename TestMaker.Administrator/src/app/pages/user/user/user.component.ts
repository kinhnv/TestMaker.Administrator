import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormConfig, FormConfigButton, FormHiddenField, FormInput, FormSelect, FormTable, TableConfig, TableConfigButton } from 'src/app/shareds/components';
import { PageHelper } from 'src/app/shareds/helpers';
import { RolesService, UsersService } from 'src/app/shareds/services';

@Component({
  selector: 'app-users',
  template: `<app-form [config]="formConfig"></app-form>`
})
export class UserComponent implements OnInit {
  pageHelper = new PageHelper('/user/user');

  get userId() {
    const pathNameAsArray = location.href.split('?')[0].split('/');
    return pathNameAsArray[pathNameAsArray.length - 1];
  }

  get formConfigTitle(): string {
    return this.pageHelper.isCreatingPage ? 'Thêm tài khoản' :
      this.pageHelper.isDetailsPage ? 'Thông tin tài khoản' :
        'Sửa tài khoản';
  }

  get formConfigButtons(): FormConfigButton[] {
    if (this.pageHelper.isCreatingPage) {
      return [{
        title: 'Lưu',
        event: ($event) => {
          const value = this.formConfig.form.value;
          value.roleIds = (<any[]>value.roles).map(x => x.roleId);
          this.usersService.createUser(value).subscribe((user) => {
              this.router.navigate([this.pageHelper.getDetailsPage(user.userId)]);
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
          url: this.pageHelper.getEditingPage(this.userId)
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
          const value = this.formConfig.form.value;
          value.roleIds = (<any[]>value.roles).map(x => x.roleId);
          this.usersService.editUser(value).subscribe((user) => {
            this.router.navigate([this.pageHelper.getDetailsPage(user.userId)]);
          });
        }
      }, {
        title: 'Quay lại',
        link: {
          url: this.pageHelper.getDetailsPage(this.userId)
        }
      }]
    }
    return [];
  }

  formConfigFormRoleIdsRoleId = new FormSelect({
    options: [],
    order: 1,
    title: 'Quyền',
    validatorOrOpts: Validators.required
  });

  formConfigFormRoleIds = new FormTable({
    title: 'Danh sách quyền',
    order: 3,
    columns: {
      'roleId': this.formConfigFormRoleIdsRoleId
    },
    validatorOrOpts: Validators.required
  });

  formConfigForm = new FormGroup({
    'userId': new FormHiddenField(''),
    'userName': new FormInput({
      title: 'Tài khoản',
      order: 1,
      validatorOrOpts: Validators.required
    }),
    'password': new FormInput({
      title: 'Mật khẩu',
      order: 2,
      validatorOrOpts: Validators.required
    }),
    'roles': this.formConfigFormRoleIds
  });

  formConfig: FormConfig = {
    id: 'userForm',
    title: this.formConfigTitle,
    buttons: this.formConfigButtons,
    form: this.formConfigForm
  };

  constructor(
    private rolesService: RolesService, 
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.pageHelper.isCreatingPage) {
      this.usersService.getUser(this.userId).subscribe(user => {

        user.roleIds.forEach(roleId =>{
          this.formConfigFormRoleIds.addFormGroup();
        });
        this.formConfig.form.setValue({
          userId: user.userId,
          userName: user.userName,
          password: user.password,
          roles: user.roleIds.map(x => {
            return {
              roleId: x
            }
          })
        });


        if (this.pageHelper.isDetailsPage) {
          this.formConfig.form.disable();
        }
      });
    }

    this.rolesService.getRolesAsSelectOptions().subscribe(options =>{
      this.formConfigFormRoleIdsRoleId.params.options = options;
    })
  }
}
