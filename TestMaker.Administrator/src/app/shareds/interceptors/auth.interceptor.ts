import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private authService: AuthService) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('api/')) {
            return this.authService.getToken().pipe(switchMap(token => {
                req = req.clone({headers: req.headers.set('Authorization', `${token.token_type} ${token.access_token}`)});
                return next.handle(req);
            }));
        }
        return next.handle(req);
    }
}
