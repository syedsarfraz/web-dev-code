import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

export const UserExistGuard: CanActivateFn = function (route) {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.getUser()
    ? true
    : router.createUrlTree(['auth', 'login']);
};
