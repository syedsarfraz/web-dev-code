import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  router = inject(Router);

  getUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  getUserType() {
    return this.getUser() ? 'member' : 'guest';
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['auth', 'login']);
  }
}
