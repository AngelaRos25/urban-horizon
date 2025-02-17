import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// service
import { UserService } from '../../service/user/user.service';
import { Login } from '../../modelli/interface';


@Component({
  selector: 'app-login',
  imports: [CommonModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string = '';
  error!: string;

  newLogin: Login = {
    token: '',
    name: '',
    email: '',
    id: 0
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  onLogin(form: NgForm) {
    this.newLogin = {
      name: form.value.name,
      email: form.value.email,
      token: form.value.token,
      id: 0
    }

    if (this.token) {
      this.userService.loginUser(this.newLogin).subscribe({
        next: (users: any[]) => {
          if (users && users.length > 0) {
            const userId = users[0].id;
            console.log('users id:', userId)
            console.log('Il login ha avuto successo', users)
            // salvo il token
            this.userService.saveToken(this.newLogin, userId)
            this.router.navigate(['/homePage/usersCard'])
          }
        },
        error: (err) => {
          console.error('Inserire un token valido', err)
        },
      });
    }else {
      this.error = 'token not found'
    }
  }

}
