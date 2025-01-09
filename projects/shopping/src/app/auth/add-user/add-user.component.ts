// import {
//   ChangeDetectionStrategy,
//   Component,
//   inject,
//   signal
// } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { Router } from '@angular/router';

// interface User {
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
// }

// @Component({
//   selector: 'app-user-form',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './add-user.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class AddUserComponent {
//   users = signal<User[]>([]); // State management using signals

//   private router = inject(Router); // Injecting Router

//   onSubmit(userForm: NgForm) {
//     if (userForm.valid) {
//       const newUser: User = {
//         firstName: userForm.value.firstname,
//         lastName: userForm.value.lastname,
//         username: userForm.value.username,
//         password: userForm.value.password
//       };

//       async addUser(newUser: User) {
//         try{
//        const usersResponse = await fetch('http://localhost:3000/users');
//       const existingUsers: User[] = await
//       usersResponse.json();
//       const isDuplicate = existingUsers.some(
//         existingUsers => existingUsers.username === newUser.username);
//       if (isDuplicate) {
//         alert('Error: User already exits');
//         return;
//       }
//     }
//       }

//       fetch("http://localhost:3000/users",
//         { method: "POST", body: JSON.stringify(newUser) }).then((res) => {
//           if (res.ok) {
//             this.router.navigate(['shopping/auth/login']);




//           } else {
//             console.error('Failed to register User');
//           }
//         })

//     }


//   }
// }
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

  async onSubmit(userForm: NgForm) { // Mark onSubmit as async
    if (userForm.valid) {
      const newUser: User = {
        firstName: userForm.value.firstname,
        lastName: userForm.value.lastname,
        username: userForm.value.username,
        password: userForm.value.password
      };

      try {
        // Fetch existing users
        const usersResponse = await fetch('http://localhost:3000/users');
        const existingUsers: User[] = await usersResponse.json();

        // Check if the new user already exists
        const isDuplicate = existingUsers.some(
          existingUser => existingUser.username === newUser.username
        );

        // If a duplicate user is found, alert the user
        if (isDuplicate) {
          alert('Error: User already exists');
          return;
        }

        // Register the new user if no duplicate is found
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser)
        });

        // Navigate if registration is successful
        if (response.ok) {
          this.router.navigate(['auth/login']);
        } else {
          console.error('Failed to register user');
        }

      } catch (error) {
        console.error("Error processing request:", error);
      }
    }
  }
}
