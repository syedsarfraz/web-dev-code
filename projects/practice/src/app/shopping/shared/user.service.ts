import { Injectable } from '@angular/core';
import { ShoppingComponent } from '../shopping.component';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

@Injectable()
export class UserService {
  getUser() {
    const user: User = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  getUserType() {
    return this.getUser() ? 'user' : 'guest';
  }

  logout() {
    localStorage.removeItem('user');
  }
}
