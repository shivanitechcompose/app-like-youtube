import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { tap } from 'rxjs';

export const getHeadersInterceptor: HttpInterceptorFn = (
  req, next) => {
  return next(req).pipe(
    tap((event) => {
      const refreshTokeSecretKey = 'localstorage-refresh-token-key';
      const authTokeSecretKey = 'localstorage-access-token-key';
      if (event.type === HttpEventType.Response) {
        if(!req.url.includes('youtube')) {
          // Check for tokens in the response and store them
          const newAccessToken = event.headers.get('authorization');
          const newRefreshToken = event.headers.get('refresh-token');
          const tokenType = event.headers.get('token-type');
          const uid = event.headers.get('uid');

          if (newAccessToken) {
            localStorage.setItem('access-token',CryptoJS.AES.encrypt(newAccessToken, authTokeSecretKey).toString());
          }
          if (newRefreshToken) {
            localStorage.setItem('refresh-token', CryptoJS.AES.encrypt(newRefreshToken, refreshTokeSecretKey).toString());
          }
          if (tokenType) {
            localStorage.setItem('token-type', tokenType);
          }
          if (uid) {
            localStorage.setItem('uid', uid);
          }
        }
      }
    })
  );
};
