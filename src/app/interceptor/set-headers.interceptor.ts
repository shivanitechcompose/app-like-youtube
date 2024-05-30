import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';

export const setHeadersInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const refreshTokeSecretKey = 'localstorage-refresh-token-key';
  const accessTokeSecretKey = 'localstorage-access-token-key';

  if(localStorage.getItem('isLoggedIn') === 'true') {

    const getRefreshToken: string | null = localStorage.getItem('refresh-token');
    const getAccessToken: string | null = localStorage.getItem('access-token');
    const uid: string | null = localStorage.getItem('uid');
    const tokenType: string | null = localStorage.getItem('token-type');

    let cloned = req;
    if (getRefreshToken && getAccessToken && uid && tokenType ) {
    const refreshToken = CryptoJS.AES.decrypt(getRefreshToken, refreshTokeSecretKey).toString(CryptoJS.enc.Utf8);
    const accessToken = CryptoJS.AES.decrypt(getAccessToken, accessTokeSecretKey).toString(CryptoJS.enc.Utf8);

      cloned = req.clone({
        setHeaders: {
          'refresh-token': refreshToken,
          'authorization': accessToken,
          'uid': uid,
          'token-type': tokenType
        },
      });
    }
    return next(cloned);
  } else {
    return next(req);
  }
};


