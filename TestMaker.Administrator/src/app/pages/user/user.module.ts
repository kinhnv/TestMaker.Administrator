import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles/roles.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedsModule } from 'src/app/shareds';
import { RoleRoutingModule } from './user-routing.module';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    RolesComponent,
    RoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedsModule,
    HttpClientModule
  ]
})
export class UserModule { }
