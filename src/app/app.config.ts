import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { setHeadersInterceptor } from './interceptor/set-headers.interceptor';
import { getHeadersInterceptor } from './interceptor/get-headers.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    // provideHttpClient(withInterceptors(
    //   [setHeadersInterceptor, getHeadersInterceptor]
    // )),
    provideAnimationsAsync()]
};
