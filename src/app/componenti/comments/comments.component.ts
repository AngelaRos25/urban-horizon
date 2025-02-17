import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


// material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// interface
import { AddComment, Comment, User } from '../../modelli/interface';

// service
import { CommentsService } from '../../service/comments/comments.service';


@Component({
  selector: 'app-comments',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;
  user!: User
  comments: Comment[] = [];

  newComment: AddComment = {
    post_id: 0,
    user_id: 0,
    name: '',
    email: '',
    body: ''
  }

  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    if (this.postId) {
      this.getUserComment()
    }
  }

  // get comment
  getUserComment() {
    return this.commentsService.getComment(this.postId).subscribe(data => {
      this.comments = data;
    })
  }

  // form comment
  addFormComment(form: NgForm) {
    const storageUser = JSON.parse(localStorage.getItem('ApiData')!);
    let storageUserId = storageUser.id
    let storageUserEmail = storageUser.email;
    let storageUserName = storageUser.name;
    console.log('Form Data:', form.value)

    this.newComment = {
      post_id: this.postId,
      user_id: storageUserId,
      body: form.value.body,
      name: storageUserName,
      email: storageUserEmail
    }

    this.commentsService.addComment(this.newComment).subscribe({
      next: (result) => {
        console.log('comment Added', result)

        const newCommentWithId = {
          ...this.newComment,
          id: result.post_id
        }
        
        this.comments.push(newCommentWithId);
        form.reset()
      },
      error: (err) => {
        console.log('error to add comment', err)
      }
    })
  }
}
