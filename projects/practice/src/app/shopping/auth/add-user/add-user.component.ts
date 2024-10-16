import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent {
  users = signal<User[]>([]); // State management using signals

  private router = inject(Router); // Injecting Router

  onSubmit(userForm: NgForm) {
    if (userForm.valid) {
      const newUser: User = {
        firstName: userForm.value.firstname,
        lastName: userForm.value.lastname,
        username: userForm.value.username,
        password: userForm.value.password
      };
    

    fetch("http://localhost:3000/users",{method:"POST",body: JSON.stringify(newUser)}).then((res) => {
      if (res.ok) {

        
        
      }
    })
  
  }

  
  }
}
