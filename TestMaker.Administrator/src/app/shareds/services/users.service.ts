import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    IApiResult,
    IUserForCreating,
    IUserForDetails,
    IUserForEditing
} from 'src/app/shareds/models';
import { SelectOption } from '../components';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private httpClient: HttpClient) { }

    getUser(userId: string): Observable<IUserForDetails> {
        return this.httpClient.get<IApiResult<IUserForDetails>>(`api/User/Admin/Users/${userId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    createUser(user: IUserForCreating) {
        return this.httpClient.post<IApiResult<IUserForDetails>>(`api/User/Admin/Users`, user)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    editUser(user: IUserForEditing) {
        return this.httpClient.put<IApiResult<IUserForDetails>>(`api/User/Admin/Users/${user.userId}`, user)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    deleteUser(userId: string) {
        return this.httpClient.delete<IApiResult<void>>(`api/User/Admin/Users/${userId}`)
            .pipe(map(x => {
                if (x.code == 200) {
                    return x.data
                }
                else {
                    throw new Error(x.errors.join('; '));
                }
            }));
    }

    getUsersAsSelectOptions() {
        return this.httpClient.get<IApiResult<SelectOption[]>>(`api/User/Admin/Users/SelectOptions`)
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
