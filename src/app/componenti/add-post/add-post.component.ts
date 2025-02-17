import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

// service
import { PostService } from '../../service/post/post.service';

// interface
import { AddPost, User } from '../../modelli/interface';

@Component({
  selector: 'app-add-post',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, MatIconModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  textPostAdded: any;
  users: User[] = [];
  title: string = '';
  body: string = '';

  newPost: AddPost = {
    user_id: 0,
    title: '',
    body: ''
  };

  constructor(private matDialog: MatDialog, private postService: PostService) { }

  ngOnInit(): void { }

  // form
  AddFormPost(form: NgForm) {
    if (!form.valid) {
      console.error('Form is invalid:', form.value);
      return;
    }
    const storageUser = JSON.parse(localStorage.getItem('ApiData')!);
    let storageUserId = storageUser.id
    console.log('Form Data:', form.value)

    this.newPost = {
      user_id: storageUserId,
      title: form.value.title,
      body: form.value.body
    }

    this.postService.addPost(this.newPost).subscribe({
      next: (result) => {
        console.log('Post added', result)
        this.textPostAdded = 'Post Created';
        this.closeDialog();
      },
      error: (err) => {
        console.log('error', err)
      }
    })
  }

  // close 
  closeDialog() {
    this.matDialog.closeAll()
  }
}
