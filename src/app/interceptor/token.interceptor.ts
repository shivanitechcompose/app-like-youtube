import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';
import * as CryptoJS from 'crypto-js';

const accessTokeSecretKey = 'localstorage-access-token-key';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
    return next(req).pipe(
        tap(event => {
            if(localStorage.getItem('isLoggedIn')) {
                if(event instanceof HttpResponse) {
                    const currentAccessToken = event?.headers?.get('Authorization');
                    if(currentAccessToken) {
                        localStorage.setItem('access-token', CryptoJS.AES.encrypt(currentAccessToken, accessTokeSecretKey).toString());
                    }
                }
            }
        })
    );
};
