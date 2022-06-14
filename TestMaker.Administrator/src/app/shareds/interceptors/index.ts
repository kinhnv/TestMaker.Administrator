import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GatewayInterceptor } from './gateway.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: GatewayInterceptor, multi: true },
];
