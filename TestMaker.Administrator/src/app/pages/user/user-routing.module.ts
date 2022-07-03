import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { RolesComponent } from './roles/roles.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: 'user-list',
    component: UsersComponent
  },
  {
    path: 'user-creating',
    component: UserComponent
  },
  {
    path: 'user-details/:id',
    component: UserComponent
  },
  {
    path: 'user-editing/:id',
    component: UserComponent
  },
  {
    path: 'role-list',
    component: RolesComponent
  },
  {
    path: 'role-creating',
    component: RoleComponent
  },
  {
    path: 'role-details/:id',
    component: RoleComponent
  },
  {
    path: 'role-editing/:id',
    component: RoleComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
