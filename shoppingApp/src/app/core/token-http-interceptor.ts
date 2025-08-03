import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export function tokenHttpInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: token,
      },
    });
  }
  return next(req);
}
