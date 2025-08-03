import { API_BASE_URL, API_URL, ENUMS } from '@Constants/index';
import { LocalStorageService } from '@Services/local-storage.service';
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService);
  const accessToken = localStorage.getData(ENUMS.accessToken);
  if (accessToken) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return next(clonedReq);
  }

  return next(req);
};

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const localStorage = inject(LocalStorageService);
  const http = inject(HttpClient);
  const router = inject(Router);
  // Skip refresh logic for refresh-token call itself to avoid recursion
  const isRefreshTokenCall = req.url.includes(API_URL.autoLogin);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const refreshToken = localStorage.getData(ENUMS.refreshToken);

      if (error.status === 401) {
        if (
          refreshToken &&
          !isRefreshTokenCall &&
          !req.headers.has('X-Retry')
        ) {
          return http
            .post<any>(`${API_BASE_URL}/${API_URL.autoLogin}`, {
              refreshToken,
            })
            .pipe(
              switchMap((res) => {
                const newAccessToken = res?.data?.accessToken;

                if (newAccessToken) {
                  localStorage.setJwtTokens(res.data);
                  localStorage.setData(ENUMS.userData, res.data.userData);

                  // Retry original request with new token
                  const retryReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newAccessToken}`,
                    },
                    headers: req.headers.set('X-Retry', 'true'), // mark as retried
                  });

                  return next(retryReq);
                }
                localStorage.removeData(ENUMS.refreshToken);
                localStorage.removeData(ENUMS.userData);
                router.navigate(['/auth/signin']);
                return throwError(() => error);
              })
            );
        } else {
          localStorage.removeData(ENUMS.refreshToken);
          localStorage.removeData(ENUMS.userData);
          router.navigate(['/auth/signin']);
          return throwError(() => error);
        }
      }
      // If already retried or no refresh token, just forward the error
      return throwError(() => error);
    })
  );
};
