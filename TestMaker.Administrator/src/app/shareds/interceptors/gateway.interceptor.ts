import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from './../../../../src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class GatewayInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('api/')) {
            if (environment.production) {
                const nextReq = req.clone({
                    url: req.url.replace('api/', '/api/')
                });
                return next.handle(nextReq);
            }
            else {
                var fromPath = '/';
                var toPath = '/';

                if (req.url.startsWith('api/Test') && environment.services.test) {
                    fromPath = 'api/Test';
                    toPath = `${environment.services.test}/api`;
                }

                if (req.url.startsWith('api/Event') && environment.services.event) {
                    fromPath = 'api/Event';
                    toPath = `${environment.services.event}/api`;
                }

                const nextReq = req.clone({
                    url: req.url.replace(fromPath, toPath)
                });
                return next.handle(nextReq);
            }
        }
        return next.handle(req);
    }
}
