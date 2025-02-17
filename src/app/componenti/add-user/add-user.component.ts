import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// service
import { UserService } from '../../service/user/user.service';

// interface
import { AddUser } from '../../modelli/interface';

@Component({
  selector: 'app-add-user',
  imports: [MatButtonModule, MatSelectModule, MatDialogContent, MatDialogActions, MatIconModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  textUserAdded!: string;

  newUser: AddUser = {
    name: '',
    gender: '',
    email: '',
    status: ''
  }

  constructor(private matDialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void { }

  // form
  AddFormUser(form: NgForm) {

    console.log('Form Data:', form.value)
    const { name, email, gender } = form.value
    if (!name || !email || !gender) {
      console.error('Missing required fields:', form.value);
      return;
    }

    this.newUser = {
      name: form.value.name,
      gender: form.value.gender,
      email: form.value.email,
      status: 'active'
    }

    this.userService.AddUser(this.newUser).subscribe({
      next: (result) => {
        console.log('users added', result)
        this.textUserAdded = 'User Created';
        this.closeDialog()
      },
      error: (error) => {
        console.error('Error during request', error)
      }
    })
  }
  
  // close
  closeDialog() {
    this.matDialog.closeAll()
  }

}

