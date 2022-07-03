import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    IApiResult,
    IRoleForCreating,
    IRoleForDetails,
    IRoleForEditing
} from 'src/app/shareds/models';
import { SelectOption } from '../components';

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private httpClient: HttpClient) { }

    getRole(roleId: string): Observable<IRoleForDetails> {
        return this.httpClient.get<IApiResult<IRoleForDetails>>(`api/User/Admin/Roles/${roleId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    createRole(role: IRoleForCreating) {
        return this.httpClient.post<IApiResult<IRoleForDetails>>(`api/User/Admin/Roles`, role)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    editRole(role: IRoleForEditing) {
        return this.httpClient.put<IApiResult<IRoleForDetails>>(`api/User/Admin/Roles/${role.roleId}`, role)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    deleteRole(roleId: string) {
        return this.httpClient.delete<IApiResult<void>>(`api/User/Admin/Roles/${roleId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    getRolesAsSelectOptions() {
        return this.httpClient.get<IApiResult<SelectOption[]>>(`api/User/Admin/Roles/SelectOptions`)
            .pipe(
                map(x => {
                    if (x.code == 200) {
                        return x.data
                    }
                    else {
                        throw new Error(x.errors.join('; '));
                    }
                })
            );
    }
}
