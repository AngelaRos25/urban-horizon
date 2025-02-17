import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../service/user/user.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const userService = inject(UserService);
    const token = userService.getToken();

   
    if (token) {
      const request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next(request);
    }
  }
  return next(req);
};
